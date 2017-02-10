# Asset Pipeline

The Asset Pipeline is the way Rails streamlines serving assets.

* CSS
* JS
* Images

[http://guides.rubyonrails.org/v4.1.7/asset_pipeline.html]()

## Why the Asset Pipeline?

The first feature of the pipeline is to concatenate assets, which can reduce the number of requests that a browser makes to render a web page. Web browsers are limited in the number of requests that they can make in parallel, so fewer requests can mean faster loading for your application.

The assets in a site rarely change, so the site can be sped up if the client has already downloaded versions of them.

But there needs to be some way to let the client/browser know that a server version of an asset has changed

Also, when you might have to manage assets from several locations:

  * specific to the site
  * shared across multiple sites
  * brought in from gems, etc

...you want the difference to be transparent to the client, but easy for the developers to manage

## Enter the asset pipeline.

It compresses CSS & JS files to make them smaller, and quicker to download.

- Even quicker if somewhere between the client and server there's caching going on.

It "fingerprints" the files, so that any changes cause them to be re-compressed, and the new versions to be provided in requests.


## Using the asset pipeline.

Any assets placed in subdirectories of "public" will ignore the pipeline, and will be served as static assets (just like in Sinatra)

Assets that need "preprocessing" (CoffeeScript, SCSS, SASS), need to be stored in the subdirectories:

- `app/assets/`
- `lib/assets/`
- `vendor/assets` 

When we deploy our Rails app, we can "compile" assets to have Rails put them in `public/assets/`

```bash
rails new asset_pipeline
rails g scaffold posts title:string content:text

# Compile the assets into public
rake assets:precompile
```

Now take a look inside `public/assets`:

The tool inside Rails that's doing all this for us is called "Sprockets"

Look into the `app/assets/stylesheets/application.css` file

It looks like CSS comments (and the JS file looks like JS comments), but the `*=` are read as commands to Sprockets, and the CSS/JS files are applied in order (so beware of overwriting previous styles or functions)

```
/*
 * This is a manifest file that'll be compiled into application.css, which will include all the files
 * listed below.
 *
 * Any CSS and SCSS file within this directory, lib/assets/stylesheets, vendor/assets/stylesheets,
 * or any plugin's vendor/assets/stylesheets directory can be referenced here using a relative path.
 *
 * You're free to add application-wide styles to this file and they'll appear at the bottom of the
 * compiled file so the styles you add here take precedence over styles defined in any styles
 * defined in the other CSS/SCSS files in this directory. It is generally better to create a new
 * file per style scope.
 *
 *= require_tree .
 *= require_self
 */
```

-  `*= require_self` places any CSS/JS in this file in the location of the require_self call

-  `*= require_tree .` recurses the given directory path and includes every file it finds

We can also require specific files:

- `*= require file_name` this could also require other files, so you could have a "my_favourite_plugins" file which has a dozen requirements to other files

The order of files listed is the order they load. If you definitely need one file loaded first put it higher in the list.

**Note:** If a file is required more than once, it will only be included the first time.


## Using assets

We're already doing it... look in the layout file:

```
<%= stylesheet_link_tag 'application', media: 'all', 'data-turbolinks-track' => true %>
<%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>
```

These are helper functions that work with the asset pipeline:

- To use images, use the image_tag helper

[i]: copy the `rails.png` image out of this folder and into an example app, and into a subfolder

```
<%= image_tag "rails.png" %>
<%= image_tag "subfolder/rails.png" %>
<%= image_tag "rails.png", {height: 100, width:200, alt: 'Rails Logo', id: 'rails_logo_image', class: 'logo_image'} %>
<%= image_tag "rails.png", :size => "100x200" %>
```

- To return the full path of the asset

```
<%= asset_path 'rails.png' %>
```