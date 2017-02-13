---
title: Rails 5 Make an App Walkthrough
type: lab
duration: "1:25"
creator:
    name: Alex Chin & Mike Hayden
    city: London
competencies: Server Applications, Rails 5
---

# Rails 5 Make an App Walkthrough

## Planning our Resources

We're going to make two resources in this app:

- planets
- moons

### Relationships

Our planets can `have_many` moons but our moons must `belong_to` a single planet.

### Why do we plan?

The longer we spend doing the planning stage, then the shorter amount of time we will have to spend coding.

## Initial setup

First, let's create our new app with:

```bash
$ rails new universe -d postgresql
```

> **Note:** When we're starting with `-d postgresql` we are changing the default database of `sqlite3` to be Postgresql.

Next we need to cd into the app:

```bash
$ cd universe
```

Great!

## Scaffolding a planet resource

We're going to scaffold this resource as we're just making a quick app:

```bash
$ rails g scaffold Planet name distance_from_sun:float mass:float rings:boolean life:boolean
```

You should see all of the files that have been created for us:

```
Running via Spring preloader in process 64052
      invoke  active_record
      create    db/migrate/20160801124511_create_planets.rb
      create    app/models/planet.rb
      invoke    test_unit
      create      test/models/planet_test.rb
      create      test/fixtures/planets.yml
      invoke  resource_route
       route    resources :planets
      invoke  scaffold_controller
      create    app/controllers/planets_controller.rb
      invoke    erb
      create      app/views/planets
      create      app/views/planets/index.html.erb
      create      app/views/planets/edit.html.erb
      create      app/views/planets/show.html.erb
      create      app/views/planets/new.html.erb
      create      app/views/planets/_form.html.erb
      invoke    test_unit
      create      test/controllers/planets_controller_test.rb
      invoke    helper
      create      app/helpers/planets_helper.rb
      invoke      test_unit
      invoke    jbuilder
      create      app/views/planets/index.json.jbuilder
      create      app/views/planets/show.json.jbuilder
      create      app/views/planets/_planet.json.jbuilder
      invoke  assets
      invoke    coffee
      create      app/assets/javascripts/planets.coffee
      invoke    scss
      create      app/assets/stylesheets/planets.scss
      invoke  scss
      create    app/assets/stylesheets/scaffolds.scss
```

These are the properties that we have added:

- name:`string`
- distance_from_sun:`float`
- mass:`float`
- rings:`boolean`

### Creating and migrating the database

In Rails 5, all of the rake commands are now prefixed by `rails`. So to create the database, we can do:

```bash
$ rails db:create db:migrate
```

You should see:

```
Database 'universe_development' already exists
Database 'universe_test' already exists
== 20160801124511 CreatePlanets: migrating ====================================
-- create_table(:planets)
   -> 0.0113s
== 20160801124511 CreatePlanets: migrated (0.0114s) ===========================
```

## Let's test

We could create some Planets in our console, but let's see what the website looks like by firing up the server

```bash
$ rails s
```

We haven't yet setup a root route (`/`) so let's navigate to `http://localhost:3000/planets/new`:

You should see:

<img width="202" alt="screen shot 2016-08-01 at 13 49 02" src="https://cloud.githubusercontent.com/assets/40461/17294438/c0807ca0-57ee-11e6-89ed-c982d47bdfa4.png">

Let's fill in with some information:

- **name:** Earth
- **Distance from sun:** 149000000
- **Mass:** 1 (we'll use the scale of 1 Earth)
- **Rings:** false
- **Life:** true

Great!

## Scaffolding a moon resource

We're to create a moon resource and at the same-time we're going to declare the relationship with planet by using `:references`.

This will add a foreign_key of `planet_id` to the moons table and also add an `index` to the database and the relationship of `belongs_to` to the moon model.

```bash
$ rails g scaffold Moon name planet:references
```

Let's checkout this migration in `db/migrate/20160801125517_create_moons.rb`

```ruby
class CreateMoons < ActiveRecord::Migration[5.0]
  def change
    create_table :moons do |t|
      t.string :name
      t.references :planet, foreign_key: true

      t.timestamps
    end
  end
end
```

Now let's migrate:

```bash
$ rails db:migrate
```

We should now see in the schema:

```
create_table "moons", force: :cascade do |t|
    t.string   "name"
    t.integer  "planet_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["planet_id"], name: "index_moons_on_planet_id", using: :btree
  end

  create_table "planets", force: :cascade do |t|
    t.string   "name"
    t.float    "distance_from_sun"
    t.float    "mass"
    t.boolean  "rings"
    t.boolean  "life"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  add_foreign_key "moons", "planets"
```

The `add_foreign_key` is a database level constraint to ensure that the column `planet_id` is actually a foreign key of planets.

## Adding a moon

Instead of just firing up the Rails app, now let's look at the code.

Inside `app/view/moons/new.html.erb` you should see:

```erb
<h1>New Moon</h1>

<%= render 'form', moon: @moon %>

<%= link_to 'Back', moons_path %>
```

Where is this form? It's in `app/views/moons/_form.erb.html` and it's shared for both new and edit.

### Adding a collection_select for planet

When we add a moon, we want to be able to create a dropdown to select which planet we want to add:

For this, we can use a `collection_select` tag:

Let's change:

```erb
<div class="field">
  <%= f.label :planet_id %>
  <%= f.text_field :planet_id %>
</div>
```

To be:

```erb
<div class="field">
  <%= f.label :planet_id %>
  <%= f.collection_select :planet_id, Planet.all, :id, :name %>
</div>
```

### Test this out

Let's fire up this up with:

```bash
$ rails s
```

Now, if we navigate to `http://localhost:3000/moons/new` we should see our dropdown!

Let's Inspect Source to see this select:

```erb
<div class="field">
  <label for="moon_planet_id">Planet</label>
  <select name="moon[planet_id]" id="moon_planet_id"><option value="1">Earth</option></select>
</div>
```

### Create a moon

Now, let's create a moon!

- **name:** Moon
- **planet:** Earth

## Displaying this moon in the view

If we look at the SHOW page for this moon `http://localhost:3000/moons/1`, we should see this:

```
Planet: #<Planet:0x007fb684b73418>
```

This is quite strange. It's Rails' string representation of a complex object. Similar to [Object object] in JS.

Let's instead of displaying this, let's edit `app/views/moons/show.html.erb` from:

```erb
<p>
  <strong>Planet:</strong>
  <%= @moon.planet %>
</p>
```

To:

```erb
<p>
  <strong>Planet:</strong>
  <%= @moon.planet.name %>
</p>
```

Great!

### Also change the Index

Now, let's do the same in the `app/views/moons/index.html.erb`.

From:

```erb
<td><%= moon.planet %></td>
```

To:

```erb
<td><%= moon.planet.name %></td>
```

## Displaying the Moons on the Planet Show

### Adding a relationship

Before we can display this, we need to add the relationship between the planet and the moon. We can see in the `Moon` model that it already `belongs_to` the planet:

```ruby
class Moon < ApplicationRecord
  belongs_to :planet
end
```

However, we need to add the `has_many` relationship to the Planet model:

```ruby
class Planet < ApplicationRecord
  has_many :moons
end
```

Let's now have a look at editing the planet show page, found at `app/views/planets/show.html.erb`:

### Updating the Erb

Now in the planet show, let`s use this new model method to fetch the moons from the database and then loop over the results.

```erb
<p>
  <strong>Moons:</strong>
  <ul>
    <% @planet.moons.each do |moon| %>
      <li><%= moon.name %></li>
    <% end %>
  </ul>
</p>
```

Great! You should now see the list of moons for this planet!

### Using a link_helper

What if we wanted to make this a link to the show page of a moon?

Rails comes with something called ActionView that has lots of erb helper methods. One of which is the [`link_to`](http://api.rubyonrails.org/classes/ActionView/Helpers/UrlHelper.html#method-i-link_to) helper.

```erb
<p>
  <strong>Moons:</strong>
  <ul>
    <% @planet.moons.each do |moon| %>
      <li><%= link_to moon.name, moon_path(moon) %></li>
    <% end %>
  </ul>
</p>
```

We can actually shorted this to:

```erb
<p>
  <strong>Moons:</strong>
  <ul>
    <% @planet.moons.each do |moon| %>
      <li><%= link_to moon.name, moon %></li>
    <% end %>
  </ul>
</p>
```

### Now let's practise

Now, let's practise by linking the moon to the planet in `app/views/moons/show.html.erb`:

Change:

```erb
<%= @moon.planet.name %>
```

To be:

```erb
<%= link_to @moon.planet.name, @moon.planet %>
```

## Partials

At the moment, we're having to navigate our way around the app using the URLs. Instead of that, let's add a `header` partial to contain our navigation:

```bash
$ mkdir app/views/application
$ touch app/views/application/_header.html.erb
```

> **Note:** The `_` prefix is a convention for naming partials

Into this, let's add:

```erb
<h1>Universe</h1>
<nav>
  <ul>
    <li><%= link_to "Planets", planets_path %></li>
    <li><%= link_to "Moons", moons_path %></li>
  </ul>
</nav>
```

Now let's include that in the `app/views/application.html.erb`:

```erb
<body>
  <%= render "header" %>
  <%= yield %>
</body>
```

Great!

### Practise by making a footer

Now let's practise by creating a footer:

```bash
$ touch app/views/application/_footer.html.erb
```

Inside this, let's add:

```erb
<p>Made with &hearts; in London WDI.</p>
```

And include it in `application.html.erb`:

```erb
<body>
  <%= render "header" %>
  <%= yield %>
  <%= render "footer" %>
</body>
```

## Collection Partial

We can use render for a slightly different purpose - DRYing up our collections.

First, let's make a new template:

```bash
$ touch app/views/moons/_moon.html.erb
```

Now, let's take a look in the INDEX view for moons, `app/views/moons/index.html.erb` and cut out the view for one moon:

Cut the out the code:

```erb
<tbody>
  <% @moons.each do |moon| %>
    <tr>
      <td><%= moon.name %></td>
      <td><%= moon.planet %></td>
      <td><%= link_to 'Show', moon %></td>
      <td><%= link_to 'Edit', edit_moon_path(moon) %></td>
      <td><%= link_to 'Destroy', moon, method: :delete, data: { confirm: 'Are you sure?' } %></td>
    </tr>
  <% end %>
</tbody>
```

To:

```erb
<tbody>
  <% @moons.each do |moon| %>
  <% end %>
</tbody>
```

And past that inside the `app/views/moons/_moon.html.erb` that you just created:

```erb
<tr>
  <td><%= moon.name %></td>
  <td><%= moon.planet %></td>
  <td><%= link_to 'Show', moon %></td>
  <td><%= link_to 'Edit', edit_moon_path(moon) %></td>
  <td><%= link_to 'Destroy', moon, method: :delete, data: { confirm: 'Are you sure?' } %></td>
</tr>
```

Inside the `index.html.erb` file, we can now do:

```erb
<tbody>
  <%= render @moons %>
</tbody>
```

### Practise this

We can similarly use this on the planets SHOW page even though we're using a method of `@planet.moons`:

we can actually just copy the table from `app/views/moons/index.html/erb` and change `@moons` to be `@planet.moons`:

```
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Planet</th>
      <th colspan="3"></th>
    </tr>
  </thead>

  <tbody>
    <%= render @planet.moons %>
  </tbody>
</table>
```

## Static Controller

Let's make a new static page for our homepage:

```bash
$ rails g controller statics home
```

Let's customize the view page to make it feel like a homepage:

```erb
<h1>Welcome to the Universe</h1>
```

### Root route

Now, let's setup our root route `/` for this page. Inside `app/config/routes.rb`:

```ruby
Rails.application.routes.draw do
  get 'statics/home'

  resources :moons
  resources :planets
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
```

Let's update to read:

```ruby
Rails.application.routes.draw do
  root 'statics#home'
  resources :moons
  resources :planets
end
```

Great! Now if we launch our server with `rails s` and visit `http://localhost:3000/` we should see our homepage!

## Assets & Asset pipeline

If you have a look at your assets file (we care only really care about `stylesheets`:

```
.
├── Gemfile
├── Gemfile.lock
├── README.md
├── Rakefile
├── app
│   ├── assets
│   │   ├── config
│   │   │   └── manifest.js
│   │   ├── images
│   │   ├── javascripts
│   │   │   ├── application.js
│   │   │   ├── cable.js
│   │   │   ├── channels
│   │   │   ├── moons.coffee
│   │   │   ├── planets.coffee
│   │   │   └── statics.coffee
│   │   └── stylesheets
│   │       ├── application.css
│   │       ├── moons.scss
│   │       ├── planets.scss
│   │       ├── scaffolds.scss
│   │       └── statics.scss
```

> **Note:** Our scaffolds have created one `.scss` file for each of our generate commands.

#### At the top of the application file:

Is this manifest:

```
/*
 * This is a manifest file that'll be compiled into application.css, which will include all the files
 * listed below.
 *
 * Any CSS and SCSS file within this directory, lib/assets/stylesheets, vendor/assets/stylesheets,
 * or any plugin's vendor/assets/stylesheets directory can be referenced here using a relative path.
 *
 * You're free to add application-wide styles to this file and they'll appear at the bottom of the
 * compiled file so the styles you add here take precedence over styles defined in any other CSS/SCSS
 * files in this directory. Styles in this file should be added after the last require_* statement.
 * It is generally better to create a new file per style scope.
 *
 *= require_tree .
 *= require_self
 */
```

The most important part is at the bottom:

```
 *= require_tree .
 *= require_self
```

- **Require tree** is requiring all of the other scss files in this directory in alphabetical order
- **Require self** will require this file

### Production vs Development

Rails will automatically compile all of your assets for you into one file of each type (`js`, `css`). In development, it serves each file individually.

### Convert to SCSS

If we rename our `application.css` to be `application.scss`, we can now use SCSS inside this file.

Let's test this by adding:

```
.
.
.
 * It is generally better to create a new file per style scope.
 *
 *= require_tree .
 *= require_self
 */

body {
  background: #f5f5f5;
  h1 {
    color: red;
  }
}
```

Great!

## Conclusion

This was a brief introduction to creating a Rails application. There is lots lots more that you could do!

But... we'll get to that in a later lesson.
