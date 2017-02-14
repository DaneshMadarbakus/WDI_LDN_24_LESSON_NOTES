---
title: Rails 5 Bcrypt Authentication
type: lesson
duration: "1:25"
creator:
    name: Alex Chin & Gerry Mathe
    city: London
competencies: Server Applications
---


# Rails 5 Bcrypt Authentication

### Objectives
*After this lesson, students will be able to:*

- Describe why encryption is important for sensitive data
- Explain how `has_secure_password` works
- Create a user model with `has_secure_password` & the appropriate attributes
- Save a user with an encrypted password
- Find a user by email & password

### Preparation
*Before this lesson, students should already be able to:*

- Build a rails app from scratch
- Create RESTful routes with corresponding actions in Rails controllers
- Create relationships between models in Rails
- Use partials and templates in views

## What is Authentication and Encryption? (15 mins)

#### Authentication

Today, we are going to learn about making our site more secure. Authentication is about making sure you know the identity of the person accessing your site and the data you store.  Essentially, it's about asking for passwords, or other proof of identity.  It doesn't guarantee anything - if your girlfriend knows your email password, they could "pretend" to be you on a website.  Authentication should be used whenever you want to know exactly who is using or viewing your site.  To know which user is currently logged-in, a website needs to store sensitive data - this data will, therefore, be *encrypted*.

#### Encryption

When we talk about passwords, the commonly used word is "encryption", although the way passwords are used, most of the time, is a technique called "hashing". Hashing and Encryption are pretty similar in terms of the processes executed, but the main difference is that hashing is a one-way encryption, meaning that it's very difficult for someone with access to the raw data to reverse it.  


|     | Hashing |	Symmetric Encryption -|  
|-----|---------|-----------------------|
|     |One-way function	| Reversible Operation |
|Invertible Operation? |	No, For modern hashing algorithms it is not easy to reverse the hash value to obtain the original input value |	Yes, Symmetric encryption is designed to allow anyone with access to the encryption key to decrypt and obtain the original input value |

Now, we'll see how to implement hashing in a Rails app.

## Demo: Implement hashing in a Rails app (20 mins)

> Note: The instructor will create an app and then show the encrypted password and how.

```bash
$ rails new authentication_example
$ cd authentication_example
$ subl .
```

To implement hashing in our app, we will use a gem called `bcrypt-ruby`. Inside your Gemfile, it should be there - uncomment it!

```ruby
gem 'bcrypt', '~> 3.1.7'
```

Then update your bundle and `rbenv rehash`:

```bash
$ bundle
$ rbenv rehash
```

### Creating a new user

Now we can create a model called `User`. To do this, we're going to use the rails generator:

```bash
$ rails g model User email password_digest
```

Next, we need to update our database:

```bash
$ rails db:create db:migrate
```

The field `password_digest` will be used to store the "hashed password", we will see what it looks like in a few seconds but know that the original password will never be stored.  The logic for hashing a password the right way would be quite long to implement manually, so instead, we will just add a method provided by `bcrypt-ruby` to enable all the hashing/storing the hash logic, and we will add a validation for the email:

In `app/models/user.rb`:

```ruby
class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, uniqueness: true
end
```

Now that we added this method `has_secure_password` to the user model, we can use two "virtual" attributes on the model, `password` and `password_confirmation`.

**has_secure_password** gives you:

- password hashing and salting
  - by the way, **salting** is when random data is used as additional input to a one-way function that hashes a password or passphrase
- authenticating against the hashed password
- password confirmation validation

### Demo this working

Now, open a rails console with `rails c`:

```ruby
user = User.new
user.password = "password"
user.password_confirmation = "password"
user.email = "u1@email.com"
user.save
user.password_digest
```

The long string of characters returned when we call the method `user.password_digest` is the hashed password!  

## Implement Users Controller (15 mins) 

Great! Now that we have a new model that will hash passwords when a new user is created, we need some controllers. First we're going to create a `users_controller.rb`:

We can do this with another generator:

```bash
$ rails g controller users index new create
```

In `app/controllers/users_controller.rb`:  

```ruby
class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      flash[:success] = "Thank you for registering!"
      redirect_to users_path
    else
      render 'new'
    end
  end

  private

    def user_params
      params.require(:user).permit( :email, :password, :password_confirmation)
    end
end
```

> **Note:** Might want to touch on strong params here.

### Tidy our roots

Let’s update our routes. Our `generator` has added some content to our routes.rb file:

```ruby
Rails.application.routes.draw do
  get 'users/index'

  get 'users/new'

  get 'users/create'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
```

We can run `rails routes` to check what this has given us:

```
      Prefix Verb URI Pattern             Controller#Action
 users_index GET  /users/index(.:format)  users#index
   users_new GET  /users/new(.:format)    users#new
users_create GET  /users/create(.:format) users#create
``` 

Now, we want to change this file to read:

```ruby
Rails.application.routes.draw do
  resources :users, only: [:index, :create]
  get 'register', to: 'users#new'
end
```

Now, let's look at what `rails route` gives us:

```
  Prefix Verb URI Pattern         Controller#Action
   users GET  /users(.:format)    users#index
         POST /users(.:format)    users#create
register GET  /register(.:format) users#new
```

### Root route

Next, lets ensure we have a root route:

```ruby
Rails.application.routes.draw do
  root "users#index"
  resources :users, only: [:index, :create]
  get 'register', to: 'users#new'
end
```

### Adding a basic navigation

It's always a good idea to have a basic navigation in the app, as it makes us feel less lost. 

So inside the `app/views/layouts/application.html.erb` let's add:

```erb
<header>
  <nav>
    <ul>
      <li><%= link_to "Home", root_path %></li>
      <li><%= link_to "Register", register_path %></li>
    </ul>
  </nav>
</header>
```

Great!

## Implementing the User Views (15 mins) 

We need some corresponding views for these routes.

### users#index

Firstly, let's update our view file `views/users/index.html.erb`:

```erb
<h1>Users</h1>
<ul>
  <%= render @users %>
</ul>
```

Let's make a corresponding partial for this:

```bash
$ touch app/views/users/_user.html.erb
```

Inside this file, add:

```erb
<li><%= user.email %></li>
<li><%= user.password_digest %></li>
```

> **Note:** Obviously, you wouldn't actually display this digest in a real app. We're just dont this for testing.

### users#new

Next, we're going to be looking at the "New" action, which is essentially our register action.

In `views/users/new.html.erb`, let's create a signup form.

You can read more about Form Helpers [here](http://guides.rubyonrails.org/form_helpers.html). In this situation, we're binding an object to the form (`name="user[email]"`) so we're using `form_for`.

There are a few things to note here:

- @user is the actual object being edited.
- This takes is a single hash of options. Routing options are passed in the `:url` hash, HTML options are passed in the `:html` hash. Also you can provide a `:namespace` option for your form to ensure uniqueness of id attributes on form elements. The namespace attribute will be prefixed with underscore on the generated HTML id.
- The `form_for` method yields a form builder object (the `f` variable).
- Methods to create form controls are called on the form builder object `f`.

```ruby
<h1>Sign Up</h1>
<%= form_for @user do |f| %>
  <% if @user.errors.any? %>
  <div class="error_messages">
    <h2>Form is invalid</h2>
    <ul>
      <% for message in @user.errors.full_messages %>
      <li><%= message %></li>
      <% end %>
    </ul>
  </div>
  <% end %>

  <div class="field">
    <%= f.label :email %>
    <%= f.text_field :email %>
  </div>
  <div class="field">
    <%= f.label :password %>
    <%= f.password_field :password %>
  </div>
  <div class="field">
    <%= f.label :password_confirmation %>
    <%= f.password_field :password_confirmation %>
  </div>
  <div class="actions">
    <%= f.submit %>
  </div>
<% end %>
```
## Sessions Controller (20 mins)

Next, we're going to move onto allowing the user to login and out of our app - i.e. authenticate themselves against the data we have for them in our database.

For this, we will need to create a sessions controller:

```bash
$ rails g controller sessions new create destroy
```

### Routes

Nex, let's update the routes for this `session_controller.rb`. In `config/routes.rb` you should now have:

```ruby
Rails.application.routes.draw do
  get 'sessions/new'

  get 'sessions/create'

  get 'sessions/destroy'

  root "users#index"
  resources :users, only: [:index, :create]
  get 'register', to: 'users#new'
end
```

We want to tidy this up to read:

```ruby
Rails.application.routes.draw do
  root "users#index"
  resources :users, only: [:index, :create]
  resources :sessions, only: [:create]
  get 'login', to: 'sessions#new'
  delete 'logout', to: 'sessions#destroy'
  get 'register', to: 'users#new'
end
```

### Controller actions

Next, in the `sessions_controller.rb` file we'll need to add some logic to handle the user's input for email and password.

Before we write it, let's go through the logic:

- Find the user using their email (Or username)
- Use the `authenticate` method provided by `has_secure_password` to validate their password
- If `true` then redirect them to somewhere, if not redirect them back to the login page

```ruby
class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      redirect_to root_path, notice: "Welcome back!"
    else
      flash.now.alert = "Invalid login credentials."
      render "new"
    end
  end

  def destroy
  end
end
```

> **Note:**

> `flash` in it's simplest form is a Hash. You can think of `:success` and `:notice` as such:

>```ruby
flash = { notice: 'watch out', success: 'you dodged it' }
```

At the moment, we are not worrying about the destroy action as we are not saving the user to a session.

## Flash messages (10 mins)

We want to display these flash messages. Flash is built into Rails (which is nice). So in `views/layouts/application.html.erb`, at the top of our body section, add:  

```erb
<% flash.each do |name, message| %>
  <div class="flash-message flash-message-<%= name %>">
    <%= message %>
  </div>
<% end %>
```

For more information on using flash messages in Rails you can have a look at [this link](http://guides.rubyonrails.org/action_controller_overview.html#the-flash).

**Note: Flash.now vs Flash**

```ruby
flash.now[:message] = "Hello current action"
```

When you need to pass an object to the next action, you use the standard flash assign ([]=). When you need to pass an object to the current action, you use `flash.now`, and your object will vanish when the current action is done.

## Implementing the session views (10 mins)

Now, we will need to add a login form to match our login action. In `views/sessions/new.html.erb`:

```erb
<h1>Login</h1>
<%= form_tag sessions_path do %>
  <div class="field">
    <%= label_tag :email %>
    <%= text_field_tag :email %>
  </div>
  <div class="field">
    <%= label_tag :password %>
    <%= password_field_tag :password %>
  </div>
  <div class="actions"><%= submit_tag "Log in" %></div>
<% end %>
```

### Add a link in the navigation

Now, let's add a link in the navigation in `app/views/layouts/application.html.erb`:

```erb
<header>
  <nav>
    <ul>
      <li><%= link_to "Home", root_path %></li>
      <li><%= link_to "Register", register_path %></li>
      <li><%= link_to "Login", login_path %></li>
    </ul>
  </nav>
</header>
```

### Delete the extra view files

When we used the rails generator to create our create, destroy and new actions. It didn't know that we don't need view fiels for create and destroy. Let's delete them.

- sessions/create.html.erb
- sessions/destroy.html.erb
- users/create.html.erb

## Testing

Great. Now let's test.

1. First, create a user via `http://localhost:3000/register`. 
2. Then, make sure this user is visible on `http://localhost:3000/users` (you should see the email you've used and the hashed password).
3. Next, try to login `http://localhost:3000/login`.

If you enter the correct credentials, you should see a message on the next page "Welcome back!"

...and that is how to implement an authentication system in Rails!

> ***Note:*** _This lesson being already quite long and involving a lot of typing from the students, we deliberately omit the students practice._

## Conclusion (10 mins)

We've covered a lot! You now know what happens when a password is saved in a database and how to authenticate a user. At the moment, our Rails app does not "remember" that a user is authenticated, to implement this, we will need functions, which is the topic of the next lesson.

- Describe the difference between hashing and encrypting.
- Explain what `has_secure_password` does for your application.
