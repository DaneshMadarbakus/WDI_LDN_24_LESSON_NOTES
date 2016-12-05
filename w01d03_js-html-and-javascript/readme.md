---
title: HTML and Javascript
type: lesson
duration: "0:30"
creator:
    name: Alex Chin
    city: London
competencies: Programming
---

# HTML and Javascript

### Objectives
*After this lesson, students will be able to:*

- Explain to students how to load JavaScript into an HTML file
- Explain why it is better to have seperate files
- Understand how to use `.prompt()`
- Understand how to use `alert()`

### Preparation
*Before this lesson, students should already be able to:*

- Must have covered the intro to HTML lesson
- Must have covered the intro to JS lesson


## HTML and Javascript

## Instructions

When developing our JavaScript, we are going to want to write it in a file and then run that file in a browser. We don't want to write everything in the console! Let's look at how we can setup our files so that we can run Javascript in our browsers:

### Address bar?!

You can run javascript directly from the address bar, don't know why you would want to do that?

```
javascript:alert("hello");void(0);
```

### HTML file

A much better way would be to create an HTML file and load that in the browser:

```sh
$ touch index.html
$ subl .
```

Inside this HTML file we want to scaffold a basic page template:

```html
<!DOCTYPE>
<html>
<head>
  <title></title>
</head>
<body>

</body>
</html>
```

You can open it in your browser by right-clicking on the file in the sidebar of Sublime and selecting "Open in Browser", or by using the `open` command in the terminal, or by dragging the file into the browser icon.

#### Script tag

We can run Javascript using a script tag:

```html
<script type="text/javascript">
  alert("hello");
</script>
```

The "type" attribute was required in HTML 4, but optional in HTML5.

Script tags however can take a `src` option:

```html
<script type="text/javascript" src="./app.js"></script>
```

It will now look for an `app.js` file in the same directory as the `index.html`.

```sh
$ touch app.js
```

Inside this file let's add:

```js
alert("Loaded.");
```

Great! This is how we should be including our JS for now.

## `window.prompt()` 

JavaScript operates in a host environment and relies on API's to handle input and output.

`window.prompt()` is a method that displays a dialog box that prompts the visitor for input.

## `window.alert()`

The alert() method displays an alert box with a specified message and an OK button.

An alert box is often used if you want to make sure information comes through to the user.

