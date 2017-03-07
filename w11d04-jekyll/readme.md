WDI
======
## Jekyll

### Learning Objectives:

- Explain how to make a basic website with Jekyll

<br>
---

| **Section** | **Timing** | **Summary** |
|-------------|------------|-------------|
| **Opening** | 10 mins | Introduction to Jekyll           
| **We Do**: Getting started | 10 mins | Create a new Jekyll blog
| **I Do**: Benefit of static vs dynamic | 10 mins | Benefits of a static website vs a Dynamic website
| **I Do**: Why is Jekyll so cool? | 10 mins | Explanation of why Jeykll is so cool              
| **I Do**: Integration with Github | 10 mins | Explain how you can create Github pages with user accounts and repositories               
| **We Do**: Deployment | 10 mins | Deploy the jekyll website to Github
| **We Do**: Create a new post | Let's create a new post
| **I Do**: Look at the _site directory | 10 mins | Let's have a look at the built files in the _site directory
| **I Do**: Liquid templating | 10 mins | Introduction to the Liquid templating language
| **I Do**: _site is excluded | 10 mins | Take a look at .gitignore and see that _site is excluded by default
| **We Do**: Edit _config.yml | 10 mins | Editting the _config.yml file
| **I Do**: Front matter | 10 mins | Explain what is front mater and page variables
| **I Do**: Jekyll Partials | 10 mins | Explain the Jekyll partials
| **We Do**: Assets (css/js/images) | 10 mins | Assets in Jekyll
| **We Do**: Creating a Github page for a repo | 10 mins | Creating a Github page for a project repository
| **I Do**: Gemfile | 10 mins | Adding a Gemfile
| **Closure** | 10 mins | Summary of the lesson                        
| **Questions** | 10 mins | Any questions

<br>
---

###Connection to a long term learning goal 

WDI Students should leave the course with a professional blog.

<br>
---

###Before Class (Student Pre-work)

N/A.

<br>
---

###Related Homework	

<br>
---

Jekyll
======
[i]: Jekyll 3.3.1

## Opening

[Jekyll](http://jekyllrb.com/docs/home/) is a great tool.

> <cite>"Blog like a hacker"</cite>

It can be used to make really powerful websites like [Obama's Fundraising Page](http://kylerush.net/blog/meet-the-obama-campaigns-250-million-fundraising-platform/).

Sometimes when we make websites we can get away with a simple static site instead of Rails or Sinatra, e.g.

- A blog
- A promotional site

**EASY $$ for us hackers!**

Static sites can be served very quickly and cheaply.
Jekyll lets us make static sites using some dynamic tools (that you will recognise from rails):

  - Layouts
  - Partials
  - Substitutions (a form of interpolation)

<br>

## We Do: Getting started

We can install Jekyll using a gem.

```
gem install jekyll
jekyll new portfolio
cd portfolio
subl .
```

We'll come back to this.

<br>

## I Do: Benefit of static vs dynamic

Rails is a tool for making dynamic sites:

- **Routes** programmatically associated with actions & views
- **Views** = html + substitutions (from db data + business logic)
- **Server-side scripting needed**
- **Response times slow** as pages built for each request

Once upon a time, we only had static sites:

- Routes followed **folder structure** of html pages
- Views = plain html
- No scripting needed
- Response times very fast as page already rendered

<br>

## I Do: Why is Jekyll so cool?

Jekyll = static site + dynamic patterns

- **No database:** Unlike WordPress and other content management systems (CMS), Jekyll doesn’t have a database. All posts and pages are converted to static HTML prior to publication. This is great for loading speed because no database calls are made when a page is loaded.
- **No CMS:** Simply write all of your content in Markdown, and Jekyll will run it through templates to generate your static website. GitHub can serve as a CMS if needed because you can edit content on it.
- **Fast:** Jekyll is fast because, being stripped down and without a database, you’re just serving up static pages. Less HTTP requests.
- **Minimal:** Your Jekyll website will include absolutely no functionality or features that you aren’t using.
- **Design control:** Spend less time wrestling with complex templates written by other people, and more time creating your own theme or customizing an uncomplicated base theme.
- **Security:** The vast majority of vulnerabilities that affect platforms like WordPress don’t exist because Jekyll has no CMS, database or Ruby/PHP. So, you don’t have to spend as much time installing security updates.
- **Convenient hosting:** Convenient if you already use GitHub, that is. GitHub Pages will build and host your Jekyll website at no charge, while simultaneously handling version control.

<br>

## I Do: Integration with Github

Conveniently, Jekyll was developed by Tom Preson-Werner at GitHub. 

There are two types of GitHub pages:

#### User/organisational pages:

- Live in master branch of special repo...
- `github.com/alexpchin` > in a repo called > `alexpchin.github.io`

#### Project pages:

- Live in **gh-pages** branch of an existing project
- Or the project pages are hosted at `orgname.github.io/projectname`

<br>

## We Do: Deployment

Let's get github to host our new personal site.

Make sure our site is committed:

```
$ git init
$ git add .
$ git commit -m "initial commit"
```

Then on GitHub, create a new repo with the name:

<your github user name>.github.io

Note: *Exactly* your account name - it's case sensitive.

Then, use the instructions that GitHub supply for an existing repo:

```
$ git remote add origin git@github.com:<your github user name>/<your github user name>.github.io.git 
$ git push origin master
```

[i]: You might be asked for your Github username and password

Now, we can visit <your github user name>.github.io in the browser. 

**Note: There will be a short delay whilst Github publishes your page.**

Behold! Our free personal blog is now online.

<br>

## We Do: Jekyll's file structure

Let's have a look at the file structure of a Jekyll website:

```
    ├── _posts 
    │     └── 2016-12-06-welcome-to-jekyll.markdown 
    ├── .gitignore
    ├── _config.yml
    ├── about.md 
    ├── Gemfile
    ├── Gemfile.lock
    └── index.html
```

#### Create a README file

It's good practise to create README file in the root and write some descriptive text explaining your blog site.

```
touch README.md
```

<br>

## We Do: Edit _config.yml

We use "_config" for important, site-wide, data and settings. 

The markdown and kramdown key/values are settings that tell jekyll:
  
  - What gem to use to convert markdown to html
  - Whether or not we want to use the kramdown gem for syntax highlighting code snippets
  
config.yml is like an initializer. Changes you make only get applied when you run `jekyll serve`.

#### Change the site title

If we look at "_config.yml", we'll see that it contains the name key and value "Your New Jekyll Site". 

We can change this value to something else:
name: <Your name>'s Personal Page

#### Replace social links

If you have a look in config.yaml

```
twitter_username: alexpchin
github_username:  alexpchin
```

In `about.md` add:

[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

```
Check out my [GitHub](http://github.com/eisacke) or send me an [email](mailto:emily@isacke.com).
```

Restart the server:

```
jekyll serve
```

<br>


## We Do: Create a new post

Let's create a new post in the _posts directory.

[i]: Make sure post is in the past!

Explain naming convention of a post:

```
2014-09-01-welcome-to-jekyll.markdown
```
Date followed by title seperated by -.

**Always easier to copy an old post**

#### Run it locally!

To start up the server:

```
jekyll serve
```

View the site locally:

```
http://localhost:4000
```

<br>

## I Do: Look at the _site directory

When we started the server, jekyll automatically ran a jekyll `build` command that combined our data, layouts and templates to create a static site. 

Notice that our posts got placed in a nested folder structure that gives rise to the blog-like routes.

Built site got put into '_site'.

#### Don't change _site

If you change files in the _site directory, the changes will be overwritten the next time you build.

<br>

#### Exclude README

If you noteice that the "README.md" file got copied across as well (as would `GEMFILE` files if you had created one).

The files idon't really have any role to play in a static site when you serve them, so we can tell jekyll to exclude them by editing the '_config.yml'.

```
exclude: ['README.md']
```
    
If you had a Gemfile:

```
exclude: ['README.md', 'GEMFILE', 'GEMFILE.lock']
```
	
Then:

```
jekyll serve
```

<br>

##Themes 

All of the styling is somewhere else, inside the gem. We can change the theme in the form of a gem.

[Find a theme from here](https://github.com/planetjekyll/awesome-jekyll-themes)

Follow instructions in Readme. 

For the `jekyll-athena` gem we add the following to the Gemfile:

`gem "jekyll-athena"`

And then in config we do:

`theme: jekyll-athena`

Then in terminal we run `bundle`.

#### Where are the rest of the files?!

Before Jekyll 3.2, when you ran `jekyll new` you used to be able to see a file structure that looked a bit more like this:

```
    ├── _includes 
    │     ├── footer.html 
    │     ├── head.html 
    │     └── header.html 
    ├── _layouts 
    │     ├── default.html 
    │     ├── page.html 
    │     └── post.html 
    ├── _posts 
    │     └── 2013-11-21-welcome-to-jekyll.markdown 
    ├── _sass
    │     ├── _base.scss 
    │     ├── _layout.scss  
    │     └── _syntax-hightlighting.scss  
    ├── css 
    │     └── main.scss 
    ├── .gitignore
    ├── _config.yml
    ├── about.md 
    ├── feed.xml
    └── index.html
```

Jekyll 3.2 was a release that introduced 'themes', and the layouts, includes, and scss folders now live inside the gem for that particular theme. The default theme for a new Jekyll site is `minima`.

You can have multiple themes listed in your site’s Gemfile, but only one theme can be selected in your site’s _config.yml.

####Overriding theme defaults

Jekyll themes set default layouts, includes, and stylesheets, that can be overridden by your site’s content. For example, if your selected theme has a page layout, you can override the theme’s layout by creating your own page layout in the _layouts folder (e.g., _layouts/page.html).

Jekyll will look first to your site’s content, before looking to the theme’s defaults, for any requested file in the following folders:

* `/assets`
* `/_layouts`
* `/_includes`
* `/_sass`

To locate theme’s files on your computer, run bundle show followed by the name of the theme’s gem, e.g. `bundle show minima` for default Jekyll’s theme. Then copy the files you want to override, from the returned path to your root folder.

`bundle show jekyll-athena`.

####Demo CSS

Go into theme-light, change $color-body-text from black to red.

##Custom themes

[Jekyll listed themes](http://themes.jekyllrc.org/)

With these themes, you can download the zip file and copy over the layouts, includes, styles etc.

## I Do: Liquid templating

[Liquid](http://liquidmarkup.org/) is the templating system that Jekyll uses.

Liquid is a special templating library developed by [Shopify](http://www.shopify.co.uk/).  

#### Look at _layouts/page

The {{ }} syntax is equivalent to erb's printing tags <%= %>. (Similar to Angular).

In Liquid, the equivalent to erb's non-outputting tag, <% %>, is {% %}.

What makes it special is that:

  - We can safely allow the end-user of our site to edit the templates
  - Because we CANNOT run arbitrary code inside liquid tags
  - We can only substitute data as content, or use liquid's built in methods (e.g. for loop)

Jekyll uses liquid templating because it allows GitHub to safely run jekyll build for our site, on their servers, safe in the knowledge that we're not able to run arbitrary code. 

<br>

## I Do: _site is excluded

Because GitHub build our site for us, we don't need to include the "_site" folder in the repo we send to GitHub. 

That's why, if we take a look at the ".gitignore" file jekyll has generated, it deliberately omits the "_site" folder from the repo.

<br>

## I Do: Front matter

In `index.html`, `page.html`, `post.html` there is a block of text at the top which is referred to as "Front Matter".

```
layout: default
title: Your New Jekyll Site
```

This data is used in the layout file by accessing the `page` variable.

Front Matter is YAML syntax data.

<br>

## We Do: Jekyll Partials

Jekyll gives us access to templates to customise layouts, and also an equivalent to 'partials' that allow us to extract common, or repeated code.

These partials are included in 

```
_includes/
```

They are included using (look in default):

```
{% include head.html %}
```

#### Compare to compiled in _site

Look at _site/index.html

<br>

## We Do: Assets (css/js/images)

Any non-special files and folders are copied, as-is, to "_site". 
We can organise stylesheets, javascript and image files any way we see fit in the root directory.

<br>


##Collections

Let's say we want to create a page for each of our projects. We could just create a new `.md` file in the route of the project like we have for `about`, but if we wanted to have our url to be `projects/hangman`, and then `projects/skillstack`, we could do it using Jekyll collections. 

Inside layouts, let's create a new file called `projects.html`, which will be the layout for our projects page. Copy and paste the layout from page as a base. Add a `<p>` tag saying 'These are my projects from WDI at General Assembly'. We'll loop through the projects once we've created them.

We also need a layout for each individual project, so create one called `project.html` as well.

In the route of the folder, create a `projects.md` file, which can use the new `projects.html` template. Copy the format over from `about.md` and change the layout to be `projects`.

Inside `config.yml` add:

```
collections:
  projects:
    output: true
    permalink: /projects/:path/
```

This is copied from the Jekyll docs. It allows us to say `site.projects`, and specifies the url path.

Create a new folder called `_projects` in the route of the folder. 

Inside there create a new file called the name of your first project, .md. So, `hangman.md`.

At the top lets add:

```
---
layout: project
title:  Hangman
subtitle: My first project at General Assembly
image: /assets/images/hangman.jpg
heroku: https://hangman-wdi-one.herokuapp.com/
---
The classic Hangman game, built with HTML, CSS3 and jQuery.
```

Create one for your second project, so `skillstack.md`. Copy the format from the `hangman.md` file over, and update the front matter.

Now in the `projects.html` layout, we can loop through the projects. Because we've set them up as a collection, we can loop over them.

```
<ul>
  {% for project in site.projects %}
    <li>
      <a href="{{ project.url | prepend: site.baseurl }}">{{ project.title }}</a>
    </li>
  {% endfor %}
</ul>
```

By default it will render them alphabetically, but if we wanted to give them a custom order, so that a potential employer looked at our most impressive project first, we can sort the order by giving them a rank in the markdown files in the front matter, and in the `projects.html` layout we can ammend it to be:

```
{% assign sorted_projects = (site.projects | sort: 'rank') %}
{% for project in sorted_projects %}
```

Here we are creating a variable called `sorted_projects` and then looping through the sorted projects on the line below.

And in `project.html` add:

```
<h2>{{ page.subtitle }}</h2>
<h3><a href="{{ page.heroku }}">View it here!</a></h3>
<img src={{ page.image }}>
<p>{{ content }}</p>
```


## We Do: Creating a Github page for a repo

[i]: Optional

Github also lets you have a site for each of your repos. 

This is a common way of adding online docs for your project.

Github Pages looks for a project site. on a branch called `gh-pages`.

We can create a site easily using the Github settings.

Step-by-step:

- Create a new repo, "my_awesome_app"
- Go to `settings` and follow the steps to add a page
- Note that the page code is in the "gh-pages" branch
- we can clone the repo and add things to "master" e.g. `$ rails new .`
- then commit and push

<br> 

## We Do: Gemfile

It is possible to create a Gemfile in the root of your website.

#### Gotcha with baseurl

Notice that our project page is served from username.github.io/repo_name/.

This affects the relative links to stylesheets and posts. 
We can visit http://jekyllrb.com/docs/github-pages/ for a quick way to fix this.

<br>

##Closure

Summary of the lesson.

#### Further Documentation

There is quite a bit of documentation available on jekyll:

- [Usage Docs](http://jekyllrb.com/docs/usage)
- [Help](https://help.github.com/categories/20/articles)


<br>

###Questions

Any questions?

<br>






