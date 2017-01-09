---
title: Ajax, Google Maps and TFL
type: lesson
duration: "1:25"
creator:
    name: Alex Chin, Rane Gowan
    city: London
competencies: Programming, Browser JS Basics
---

# Ajax, Google Maps and TFL

### Objectives
*After this lesson, students will be able to:*

- Understand how to request JSON from a database
- Understand how to implement a Google map
- Customise Google maps

### Preparation
*Before this lesson, students should already be able to:*

- Must understand how to write an Ajax using jQuery
- Should be able to make a MVC app with Node

## Demo of the solution code

_Ensure that you have run the Jake task already to populate the cameras in the database_

To give some context to the lesson and understand a bit better what we want to build, let's have a look at the running solution code.

<img width="1037" alt="screen shot 2016-02-17 at 11 40 56" src="https://cloud.githubusercontent.com/assets/40461/13108508/5db425c8-d56b-11e5-803f-10f405bf625b.png">

It's an app that lets us look at all of the security cameras in London. How hacker is that?!

## Intro to Google Maps (15 mins)

We've already had a look at how to write AJAX. One of the great successes of AJAX has been the improvement to the browsing experience of Google Maps!

_Load [Google Maps](https://www.google.co.uk/maps)_

Imagine if scrolling through the map and every time you have to load new map content, you need to reload the page?! How annoying would that be?

Now, let's have a look at the requests tab from Google Chrome and have a look at all of the content that has been requested.

<img width="1033" alt="screen shot 2016-02-17 at 15 12 39" src="https://cloud.githubusercontent.com/assets/40461/13113876/f5ba6b4e-d588-11e5-9c2c-dd4e0c4ced6c.png">

We can filter by XHR (Ajax) to see the requests being made.

### Amazing Google Maps facts and figures

As a developer you WILL need to work on a Google Maps project at some point. Let’s dig into some numbers and statistics relating to Google Maps:

- **2,337** – The number of mashups using Google’s API that are listed on ProgrammableWeb.
- **15%** – This is the usage share of the Google Maps API, currently the **most used API** tracked by ProgrammableWeb..
- **25,000** – The maximum number of map loads any Google Maps API may generate per day for up to 90 consecutive days without incurring a cost.
- **800-1500** feet – The altitude from which most of the high-resolution imagery of cities you find in Google Maps are taken, even though Google uses the word satellite.
- **0** – If you try to look at North Korea using Google Maps you will only see the satellite image. It’s the only country in the world with no data available in Google Maps.
- **23** – The maximum zoom level in Google Maps, only available in a small number of places. In most areas the zoom level stops at 20.
- **12 billion** – The number of miles per year that Google Maps Navigation, included on Android handsets, has guided users.
- **2 years** – The time saved per day for users of Google Maps Navigation with the traffic routing functionality.
- **1.18%** – The share of sites in the top 10,000 of sites tracked by BuiltWith.com that use Google Maps
- **1,162,460** – In total, BuiltWith.com reports that this many sites use Google Maps.
Interest for Google Maps has steadily increased since its introduction, as measured by Google Trends.

## Getting data for our map - (10 mins)

Before we add Google Maps to this application, first we need some data to plot on it. Let's have a look at the starter-code.

_Send across the starter-code_

```
.
├── Jakefile.js
├── config
│   └── routes.js
├── controllers
│   ├── cameras.js
│   └── statics.js
├── gulpfile.js
├── index.html
├── models
│   └── camera.js
├── package.json
├── server.js
└── src
    ├── images
    │   └── marker.png
    ├── js
    │   └── client.js
    └── scss
        └── style.scss

7 directories, 12 files
```

[Jake](https://github.com/jakejs/jake) is a JavaScript build tool (similar to Rake) that allows us to run tasks. We're going to create a task to populate our database with camera information.

In order to run jake you need to install the package `jake` and create a `Jakefile`. We have already done this for you as this lesson is more about GoogleMaps than Jake.

### Take a look at the Jake task

In the starter-code provided, let's have look at the contents  of Jakefile. At the bottom of this file, we can see:

```js
desc('Populate cameras');
task('cameras', getCameras);

desc('Default task is test');
task('default', ['cameras'], true);
```

> **Note:** Whilst this looks similar to the syntax we might have seen with testing - it is different. Don't get them confused!

- `desc` is just a string description
- `task` is a function that takes a string name for the task and then either a function or an array of functions of code to run.

The task that you have in this Jakefile makes a request (using `request-promise`) to a URL from Transport For London's servers `https://s3-eu-west-1.amazonaws.com/tfl.pub/Jamcams/jamcams-camera-list.xml` and it returns the data and saves it to our database.

> **Note:** The TFL server actually saves camera images using a specific name for the camera every few minutes. So when we request these images from their web-service they are up-to-date!

Let's run that task with:

```bash
$ npm i jake -g
$ jake
```

Great! You should see that the task runs and console logs:

```
Camera 869 downloaded.
Camera 870 downloaded.
Camera 871 downloaded.
Camera 872 downloaded.
Camera 873 downloaded.
Camera 874 downloaded.
Camera 875 downloaded.
Camera 876 downloaded.
Camera 877 downloaded.
```

We now have camera information in our Mongo database that we can access!

You can now fire up the app using:

```bash
$ gulp
```

And you can access this data by navigating to `http://localhost:3000/cameras`. You should see the JSON output in your browser.

## Using AJAX to get the cameras

Now that we have data in our database, we now need to access that data in our front-end using AJAX. Let's open a new tab in our terminal using `cmd+t` and open our code in our text editor. 

In our browser, let's navigate to `http://localhost:7000/`.

#### Document ready

Inside `src/js/client.js` - let's just add some code to check that it's being loaded. As we've already loaded jQuery in the `index.html` file, we can do:

```js
$(() => {
  console.log("Document ready");
});
```

Now, if you refresh the page, you should see the console log.

#### Use ajax to get the cameras

Next, let's write some code to make an ajax request to get the camera data from our database into our clientside JS.

```js
$(() => {
  $.get("http://localhost:3000/cameras").done(data => {
    console.log(data.cameras);	
  });
});
```

In your Chrome terminal, you should see something like:

<img width="1022" alt="screen shot 2016-02-17 at 11 36 35" src="https://cloud.githubusercontent.com/assets/40461/13108432/c59a7bca-d56a-11e5-9621-05e9ff88c9df.png">

## Using Google Maps

Great, now that we have data to place on the map - we need an actual map!

#### Include the Google library

In order to use Google maps in your application, you first need to include the Google maps script on your page.

This has actually been done already for you in `index.html`.

```html
<script src="https://maps.googleapis.com/maps/api/js?key=<STUDENT-API-KEY>" charset="utf-8"></script>
```

## Accessing Google Maps API

Most API's nowadays are protected with a password. We will need to create an API Key for google maps to allow us access to the API.

### Creating an API Key

1. Go to [https://developers.google.com/maps]() and click on the `documentation` link in the navbar.

2. Scroll down and click on the `Google Maps JavaScript API`

3. Click on `Get a Key` on the left side navbar.

4. Scroll down to the blue button `Get a Key`.

### Creating a Project

Create a new project and click `enable api`

> **Note:** This project must have a unique name

Copy API_KEY into the script tag inside `index.html` similar to:

```
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBxM36DxD-TmmCuWMML0UXBVSirOUkF42Q" charset="utf-8"></script>
```

We can check that this has been loaded by going into the Chrome console and typing `google`

```
google
> Object {maps: Object}
```

#### Check the documentation

_Show the [Google Maps Javascript](https://developers.google.com/maps/documentation/javascript/examples/map-simple) documentation._

Similar to the example on the documentation, we're going to use this code to create a basic app. The only main difference being that we have made ours object-orientated and we have changed the lat/lng values and the type of map terrain.

```
const googleMap = googleMap || {};

googleMap.mapSetup = function(){
  let canvas = document.getElementById("map-canvas");
  
  let mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  this.map = new google.maps.Map(this.canvas, mapOptions);
};

$(googleMap.mapSetup.bind(googleMap));

```

Let's break this code down a little bit:

```js
let canvas = document.getElementById("map-canvas");
```

This code is looking for an element with an id `map-canvas`. 

> **Note:** We've chosen to name our id `map-canvas` just so that we don't have lots of things called `map` in our codebase.

```js
let mapOptions = {
  zoom: 12,
  center: new google.maps.LatLng(51.506178,-0.088369),
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

this.map = new google.maps.Map(this.canvas, mapOptions);
```

We've then seperated the options for the GoogleMaps into an object and then created a new google maps Map object and assigned it's value to `this.map`. We've used `this` so that it is bound to the object and can therefore be used in other functions belonging to that object.

### Add some CSS

By default, our map doesn't have a height. So we need to give it a height in our CSS. For this app, we're just going to use 100vh which is the height of the window.

```css
html, body {
  margin: 0;
}

#map-canvas {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
}
```

If you refresh the page you should now see a map!

## Adding the cameras to the map - (20 mins)

Fantastic! We now need to link up our map with our cameras.

Let's refactor the ajax call by putting it in a function and attaching it to our new `googleMap` object.

```js
const googleMap = googleMap || {};

googleMap.getCameras = function(){
  $.get('http://localhost:3000/cameras').done(data => console.log(data.cameras));
};

googleMap.mapSetup = function(){
  let canvas = document.getElementById("map-canvas");
  
  let mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
   };
	
	this.map = new google.maps.Map(this.canvas, mapOptions);
	this.getCameras();
};

$(googleMap.mapSetup.bind(googleMap));
```

We call are calling the function, `this.getCameras()`, at the end of our initialize function.

#### Loop through cameras

Next, instead of just logging the cameras array - lets create a new function to to loop through the camera:

```js
googleMap.loopThroughCameras = (data) => {
  $.each(data.cameras, (index, camera) => {
    console.log(camera);
  });
};

googleMap.getCameras = function(){
  $.get("http://localhost:3000/cameras").done(this.loopThroughCameras);
};
```

We're looping through the `data` that we received from the API (our server) using jQuery's `$.each`.

#### Create the markers

Next, we need to make a function to create a marker for each camera.

```js
MapApp.createMarkerForCamera = function(camera) {
  console.log(camera);
};

googleMap.loopThroughCameras = (data) => {
  $.each(data.cameras, (index, camera) => {
    googleMap.createMarkerForCamera(camera);
  });
};
```

Next, we need to take the `lat` and `lng` of the camera object, create a LatLng object and add it to the map.

```js
googleMap.createMarkerForCamera = function(camera) {
  let latlng = new google.maps.LatLng(camera.lat, camera.lng);
  let marker = new google.maps.Marker({
    position: latlng,
    map: this.map
  });
};
```

If you load the page now, you should now see markers!

## Adding Infowindows - (10 mins)

This is great, but what we really want to do is to create an infowindow that will popup and display the camera's image when we click on it.

First, we need a function for this. This function is going to have two arguments, `camera` and `marker`.

We need the `camera` data from our database and we need the `marker` to create an eventListener to know when to trigger the infowindow. 

```js
MapApp.addInfoWindowForCamera = function(camera, marker){
};
```

Next, we need to create the eventListener and the infowindow.

_Send this code over the the students_

```js
googleMap.addInfoWindowForCamera = function(camera, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    this.infowindow = new google.maps.InfoWindow({
      content: `<img src="http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/${ camera.file }"><p>${ camera.location }</p>`
    });

    this.infowindow.open(this.map, marker);
  });
};
```

Let's go through this code:

- We have to use the Google `addListener` code to create an eventListener inside the GoogleMap canvas.
- Then we need to create an infowindow using the Google library.
- We're populating this with some HTML of an image that has a src to the TFL's image for that specific camera and a title.
- Finally, we're opening the infowindow.

We need to call this in the `createMarkerForCamera` function:

```js
googleMap.createMarkerForCamera = function(camera) {
  let latlng = new google.maps.LatLng(camera.lat, camera.lng);
  let marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    icon: "/images/marker.png",
    animation: google.maps.Animation.DROP
  });

  this.addInfoWindowForCamera(camera, marker);
};
```

### Too much information?

This is great! However, if we click on several markers we get multiple infowindows. This is not so good...

In order to fix this, we need to check for whether or not there is currently an infowindow open and if so, we need to it.

```js
googleMap.addInfoWindowForCamera = function(camera, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infowindow != "undefined") this.infowindow.close();

    this.infowindow = new google.maps.InfoWindow({
    content: `<img src="http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/${ camera.file }"><p>${ camera.location }</p>`
  });

    this.infowindow.open(this.map, marker);
  });
};
```

We're closing the window with this code here:

```js
if (typeof self.infowindow != "undefined") self.infowindow.close();
```

## Independent Practice (20 minutes)

> ***Note:*** _This can be a pair programming activity or done independently._

Great! Now using the Google Maps documentation you have two tasks.

1. Add a custom marker (there is one in `/public/images/marker.png`
2. Add animation to make the markers drop onto the page

## Conclusion (5 mins)

There are some other common things that you might do with Google Maps. Usually, you would use Google Maps with Google Places and potentially an autocomplete field.

- What is Jake?
- What is a LatLng object