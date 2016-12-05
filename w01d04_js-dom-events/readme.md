---
title: DOM Events
type: lesson
duration: "1:25"
creator:
    name: Alex Chin
    city: London
competencies: Programming, Server Applications
---

# DOM Events

### Objectives
*After this lesson, students will be able to:*

- Describe how javascript events works in the browser
- Explain how to handle to handle functions and execute code given some events
- Identify what the object `event` correspond to  

## Javascript, Event Driven development (5 mins)

One of the features of the World Wide Web that makes it so popular is its interactive nature. When a Web page is rendered, the client can interact with it. clicking on links and buttons to change pages or to make windows pop up, entering information in forms and view responses based on entries. In these and many other ways, Web pages are responsive to actions. In other words, Web pages are **"event-driven"**, reacting to events that initiated by the user such as mouse clicks or keyboard entries.

Most programs are **event-driven**, if you think about it...  

- When our web server runs, it sets up our app and then just sits there.
- It's not until something happens - an event - our visit to the web page - that our code runs.

We can define events on elements, and what JS to run when the event happens.

## Describe addEventListener (5 mins)

The [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) method attaches an event handler to a specified element.

```
element.addEventListener(event, function, useCapture);
```

- The first parameter is the type of the `event` (like "click" or "mousedown").
- The second parameter is the `function` we want to call when the event occurs.
- The third parameter is an optional boolean value specifying whether to use event bubbling or event capturing. We'll get onto this later

## Click events / Mouse events (10 mins)

Open the first file: `click_events.html`

Javascript allows us to capture and use click events.

Open the Javascript Console in Chrome.

```
More Tools > Developer Tools > Javascript Console
```

You can bind an onclick event inline, like this:

```
<button onclick="alert('Hello WDI!');">I'm a button!</button>
```

Looking for onclick events is a very common event in web browsers:
Let's look at 4 kinds of onclick events:

#### "click"

```
document.getElementById("click").addEventListener("click", function(e) {
  alert("I've been clicked!");
});
```

#### "dblclick"

```
.addEventListener("dblclick", function() {
  alert("I've been clicked!");
});
```

#### "mousedown"

```
.addEventListener("mousedown", function() {
  alert("I've been clicked!");
});
```

#### "mouseup"

```
.addEventListener("mouseup", function() {
  alert("I've been clicked!");
});
```

## Hover events (10 mins)

Open the next file: `hover_events.html`

> ***Note:*** _In the context of the event, `this` means the element that the event is handled for (so the image tag in this example). And any document element can have events bound to it, and we can always use the console to see what's going on._

#### "mouseover"

```
.addEventListener("mouseover", function() {
   console.log("mouseover!");
});

```

#### "mouseout"

```
.addEventListener("mouseover", function() {
   console.log("mouseover!");
});
```

#### "mousemove"

```
.addEventListener("mouseout", function() {
   console.log("mouseover!");
});
```

## Form events (10 mins)

Open the next file: `form_events.html`

Like click events, forms are very common things to have to deal with on a website.

#### "focus"

```
.addEventListener("focus", function(e) {
   console.log("focus!");
});
```

#### "blur"

```
.addEventListener("blur", function(e) {
   console.log("blur!");
});
```

#### "change"

```
var radios = document.getElementsByClassName("radio_event")

for( var i=0; i<radios.length; i++ ) {
  radios[i].addEventListener("change", function(e) {
    console.log('Radio selected');
  });
}
```

#### "submit"

```
document.getElementById('form').addEventListener("submit", function(e) {
   alert("Form submitted");
   console.log("Form submitted");
   return false;
});
```

Let's run the code and submit the form, what happens?

The default browser behaviour for a `submit` event is to post the form data and then reload the page. We wont see our javascript executing due to this reload; we need some way to disable this default behaviour.

##### The `event` keyword

Often, it's important to get more infomation about the javascript `event` that you are listening for. The window has a property called called `event` (`window.event`) that stores information about the last event executed by the browser. However, the information about this event is also passed into each callback function of an event listener as it's first argument. In order to access this argument, we need to give it a name. The convention is `e` or `ev`. 

Whilst you can access the global `window.event` inside most callback functions, it is considered good practise to pass the argument into the function explicitly. This makes for more modular code.

```js
element.addEventListener('submit', function(e))
```

The event object has a method `.preventDefault()` which we can use to prevent the reload of the page.

```js
document.getElementById('form').addEventListener("submit", function(e) {
	e.preventDefault();
	
   alert("Form submitted");
   console.log("Form submitted");
   return false;
});
```

Now if you refresh the page and submit the form, notice how it does not reload the page and the javascript is visibily executed.

The methods and properties you have access to will be different for each event.

## Window events (10 mins)

Open the next file: `window_events.html`

As well as interacting with elements inside the page, like clicking items or interacting with forms. You can also access information when you change the browser window.

- Window "resize" event

```
window.onresize
```

- Window "scroll" event

```
window.onscroll
```

## Event Bubbling - Lowest to highest (10 mins)

Open the next file: `bubbling_events.html`

The concept of **event bubbling** was introduced to deal with situations where a single event, such as a mouse click, may be handled by two or more event handlers defined at different levels of the **Document Object Model (DOM)** hierarchy.

If this is the case, the event bubbling process starts by executing the event handler defined for individual elements at the **lowest level** (e.g. individual hyperlinks, buttons, table cells etc.). From there, the event bubbles up to the containing elements (e.g. a table or a form with its own event handler), then up to even higher-level elements (e.g. the BODY element of the page). Finally, the event ends up being handled at the highest level in the DOM hierarchy, the document element itself (provided that your document has its own event handler).

### Event Propagation

The term **event propagation** is often used as a synonym of event bubbling. However, strictly speaking, event propagation is a wider term: it includes not only **event bubbling** but also **event capturing**.

If you look at the code:

```
document.getElementById("children_1").addEventListener("click", function(e) {
  e.stopPropagation();
  alert("#children_1 click");
});
```

We have used the [`.stopPropagation()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) method to prevent further propagation of the current event.

We **haven't** done that in this code:

```
document.getElementById("children_2").addEventListener("click", function(e) {
  alert("#children_2 click");
});
```

As you can see, it generates two alert boxes.

### Event Capturing - Highest to lowest

Event capturing is the opposite of bubbling (events are handled at higher levels first, then sink down to individual elements at lower levels). Event capturing is supported in fewer browsers and rarely used; notably, Internet Explorer prior to version 9.0 does not support event capturing.

The [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) has an optional parameter `useCapture`:

```
target.addEventListener(type, listener[, useCapture]);
```

Let's have a look what happens if we add `true` to the parent event listener.

```
document.getElementById("parent").addEventListener("click", function(e) {
  alert("#parent click");
}, true);
```

If you click on the yellow box, the parent element's event listener should fire first, then the 2nd child, then the 1st child.

## Conclusion (5 mins)
Summary of the lesson

- Ask some questions
