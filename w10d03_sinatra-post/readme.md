---
title: Sinatra POST
type: lesson
duration: '1:00'
creator:
    name: Alex Chin
    city: London
competencies: Server Applications
---

# Sinatra POST

### Objectives
*After this lesson, students will be able to:*

- Explain how you do a POST request in Sinatra
- Create a multi-page app with Sinatra
- Create a layout.erb template
- Implement basic routing

### Preparation
*Before this lesson, students should already be able to:*

- Understand how to make a basic Sinatra app with GET routes
- Understand the concept of routing

## Introduction - (10 mins)

This lesson is designed to gain familiarity with routing in Sinatra. Building links that make GET requests and a form which POSTs.

## Let's make a Sinatra App

The applications we have been writing are cool, but they are just one page. Let’s create an application that has links to multiple pages.

```bash
$ mkdir sinatra_post && sinatra_post
$ touch app.rb
$ mkdir public
$ mkdir views
$ touch public/style.css
$ touch views/layout.erb
$ subl .
```

#### Layout.erb

Send over the layout.erb:

```html
<!DOCTYPE>
<html lang='en'>
  <head>
  	<title>My website</title>
    <link rel='stylesheet' href='/style.css'>
  </head>
  <body>
    <nav>
      <ul>
        <li><a href='/'>Home</a></li>
        <li><a href='/sports'>Sports</a></li>
        <li><a href='/weather'>Weather</a></li>
        <li><a href='/gossip'>Gossip</a></li>
        <li><a href='/celebrity'>Celebrity</a></li>
      </ul>
    </nav>
    <%= yield %>
  </body>
</html>
```

Add this to the layout file.

#### yield

```yield``` here will render the content from diffent pages so that you can have the same basic layout on every page.

Start by including sinatra in app.rb:

```ruby
require 'sinatra'
require 'sinatra/reloader' if development?
```

Then let's create a home route:

```ruby
get '/' do
  @title = "Home"
  erb :home
end
```

We need to create an erb file that corresponds to this:

```bash
$ touch views/home.erb
```

Let's add inside `layout.erb`:

```erb
 <h1><%= @title %></h1>
 <%= yield %>	
```

To the layout file and make the different routes:

```ruby
get '/sports' do
  @title = "Sports"
  erb :sports
end

get '/weather' do
  @title = "Weather"
  erb :weather
end

get '/gossip' do
  @title = "Gossip"
  erb :gossip
end

get '/celebrity' do
  @title = "Celebrity"
  erb :celebrity
end
```

And the corresponding views:

```bash
$ touch views/sports.erb
$ touch views/weather.erb
$ touch views/gossip.erb
$ touch views/celebrity.erb
```

## Adding a POST route

So far however, we've only used the HTTP verb GET.

Let's go into `home.erb` and write:

```erb
<% if @error %>
  <h2><%= @error %></h2>
<% end %>

<form action='/navigate' method='post'>
  <input type='text' name='destination' autofocus>
  <button>Nav!</button>
</form>
```

Then in app.rb write:

```ruby
post '/navigate' do
  case params[:destination].downcase
  when 'sports' then redirect to('/sports')
  when 'weather' then redirect to('/weather')
  when 'gossip' then redirect to('/gossip')
  when 'celebrity' then redirect to('/celebrity')
  else 
    @error = "invalid page selected"
    erb :home
  end
end
```

We're using POST because we're sending data to the server.

## Closure

Summary of the lesson.