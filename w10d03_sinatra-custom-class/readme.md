---
title: Sinatra Custom Class
type: lesson
duration: '0:45'
creator:
    name: Alex Chin, Gerry Mathe
    city: London
competencies: Server Applications
---

# Sinatra Custom Class

### Objectives
*After this lesson, students will be able to:*

- Understand how to include models with Sinatra
- Understand how a class can be used as a model
- Understand how to start building an MVC framework with Sinatra

### Preparation
*Before this lesson, students should already be able to:*

- Make a basic Sinatra application
- Write HTML

## Intro to classes as models in Sinatra

Today we are going to look at using a custom class as a model in Sinatra.

Create a new directory and a main file for our sinatra app:

```bash
$ mkdir intro_to_classes && intro_to_classes
$ touch main.rb
$ subl main.rb
```

Add to main.rb: 

```ruby
require 'sinatra'
```

#### Create a model

```bash
$ mkdir models
$ touch models/capitalize.rb
```

In capitalize.rb:

```ruby
class Capitalize
  def self.cap(word)
    word[0].upcase + word[1..word.length]
  end
end
```

## Create a Ruby script to test the class

Create:

```bash
$ touch cli_script.rb
```

In this script:

```ruby
require_relative './models/capitalize'

puts "Which word do you want to capitalize?"
word = gets.chomp

new_word = Capitalize.cap(word)

puts "the word capitalized is -> #{new_word}"
```

#### Run the script

```bash
$ ruby cli_script.rb
```

You should now see that our class has capitalized our input!

#### In your sinatra app

We can use this class inside our Sinatra app just as we have done in the command line:

```ruby
require 'sinatra'
require_relative './models/capitalize'

get '/' do
  Capitalize.cap("gerry")
end
```