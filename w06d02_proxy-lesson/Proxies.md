# Proxies

## Intro

### What is CORS?

> ​Cross-origin resource sharing (CORS) is a standard for accessing web resources on different domains. CORS allows web scripts to interact more openly with content outside of the original domain, leading to better integration between web services.
> 
> ​To prevent websites from tampering with each other, web browsers implement a security measure known as the same-origin policy. The same-origin policy lets resources (such as JavaScript) interact with resources from the same domain, but not with resources from a different domain. This provides security for the user by preventing abuse, such as running a script that reads the password field on a secure website.
> 
> In cases where cross-domain scripting is desired, CORS allows web developers to work around the same-origin policy. CORS adds HTTP headers which instruct web browsers on how to use and manage cross-domain content. The browser then allows or denies access to the content based on its security configuration.

From: [https://www.maxcdn.com/one/visual-glossary/cors/?utm_source=text]()

### What happens if CORS is disabled?

If `CORS` isn't enabled on our target API, when we make an AJAX request we would see an error that looks something like this:

<img width="916" alt="screen shot 2017-01-12 at 10 50 31" src="https://cloud.githubusercontent.com/assets/11501555/21886742/f835e990-d8b4-11e6-8909-3ddaee169a34.png">

This can be quite frustrating, however there is a way of making the request in a different way in order to get access to the data; we can do this by creating a `proxy`.

### Making a proxy request

We are going to be using a npm package called `request-promise` which will allow us to make a request to an API from the server side.

The reason why this will work is because the request that is made through `request-promise` is NOT an AJAX request. 

Instead, it uses the `HTTP` package meaning that the request can be made as a normal HTTP request as if you were in the browser.

So, in order to get the data from the API, the request will have to be made on the server side and then the data will be returned to the client side.

We are going to be making an app that will have data about locations around the world from an internal api, then, we will call a weather api through a proxy to add data about the live weather to those locations.

> Send over `starter-code`

```
.
├── config
│   └── config.json
├── db
│   ├── data.json
│   └── seeds.js
├── index.html
├── package.json
├── public
│   ├── css
│   │   └── style.css
│   └── js
│       └── client.js
└── server.js

5 directories, 8 files
```

Let's take a look through the `starter-code`. We can see that we just have a basic express app. 

### Skeleton

We are going to use a css-framwork called [Skeleton](http://getskeleton.com/) for this lesson.

Skeleton is a light css framework, the library only comes with: 

- Grid
- Typography
- Some styling for buttons, lists and tables

Skeleton and other light CSS framworks are great for styling small sized apps like this one.

## Seeding data

There is a `data.json` file which contains an array of JSON objects reguarding famous cities in the world, we are going to add this data to our database.

In order to do this we need to create a model 

```bash
$ mkdir models
$ touch models/place.js
```

Now, we can create a schema for `Place`

```js
const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  nickname: { type: String, trim: true, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Place', placeSchema);
```

Now, we can use the `seeds` file to create a `Place` for every object inside our array.

Let's write out the `seeds.js` file.

```js
const mongoose = require('mongoose');
const config   = require('../config/config');
const data     = require('./data');
const Place    = require('../models/place');

mongoose.connect(config.db);

Place.collection.drop();

data.forEach(place => {
  Place.create(place, (err, place) => {
    console.log(`${place.name} was created`);
  });
});
```

Okay, now we can run `node db/seeds` inside terminal and we should see this returned.

<img width="393" alt="screen shot 2017-01-12 at 11 02 27" src="https://cloud.githubusercontent.com/assets/11501555/21887157/a5f6d2f0-d8b6-11e6-8149-9e790e316c46.png">

## Adding a Route

We have added the data into our database, now we need to be able to access it in the client side.

First, we need to make a route to get all places, let's add this into our `server.js`

We are going to use mongoose promises for this lesson. We aren't going to go into them in much detail as we have a lesson on them later on in the course, but you might come across them in examples online.

In order to do this we need to require this at the top of our page along with the package requirements.

```js
mongoose.Promise = global.Promise;
```

We now can create the route, this needs to be above the one that is already in the file. We also need to require the model.

```js
const Place = require('./models/place');

•
•
•

app.get('/api/places' (req,res) => {
  Place
    .find({})
    .then(places => {
      return res.status(200).json(places);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

app.get('/*', (req, res) => {
  return res.sendFile(`${__dirname}/index.html`);
});
```

Great, now we can access the data. To test this run `nodemon` and navigate to `http://localhost:3000/api/places` in the browser. You should see this being returned.

![screen shot 2017-01-12 at 11 06 52](https://cloud.githubusercontent.com/assets/11501555/21887282/4086ba7e-d8b7-11e6-88c7-e8ff91214a4e.png)

Cool! So let's make an AJAX request so we can render the data on the page.

Inside `client.js`

```js
$(init);

function init() {
  $.get('http://localhost:3000/api/places').done(function(data) {
    console.log(data);
  });
}
```

So now if we navigate to `localhost:3000` and open up the browser tools, we should see our 3 objects logged out in the console.

Next, we can actually render the data to the page. We can also use some skeleton classes to help with the layout

```js
$(init);

function init() {
  const $main = $('main');

  $.get('http://localhost:3000/api/places').done(data => {
    data.forEach(place => {
      $main.append(`
        <div class="row">
          <div class="columns three">
            ${place.name}
          </div>
          <div class="columns nine">
            ${place.nickname}
          </div>
        </div>
        `);
    });
  });
}
```

If we refresh the page, we should now see this.

![screen shot 2017-01-12 at 11 12 31](https://cloud.githubusercontent.com/assets/11501555/21887498/0c343818-d8b8-11e6-88f0-3d36e0dba16a.png)


## Weather API

Great, so we have our own data rendering to the page, now we want to find an API which will give us some weather data.

The best source for searching for API's is a website called [Programmable Web](https://www.programmableweb.com/).

We are going to use [http://weathers.co/api](http://weathers.co/api) to get weather data.

> Look at the documentation

It looks like we can search for weather based on location, perfect!

Lets create an ajax request to get weather data for each of our places.

```js
$(init);

function init() {
  const $main = $('main');

  $.get('http://localhost:3000/api/places').done(data => {
    data.forEach(place => {
      $main.append(`
        <div class="row">
          <div class="columns three">
            ${place.name}
          </div>
          <div class="columns nine">
            ${place.nickname}
          </div>
        </div>
        `);
    });
  });
}
```

Refresh the browser, we can see that we are getting an error in the console. The api is blocking AJAX requests, so... let's use the `request-promise` package to make the request on ther server side.

## Proxy request (request-promise)

```js
npm i request request-promise --save
```

We need to install the `request` package as it is a dependency of `request-promise`. However, we only need to require `request-promise` inside our `server.js`

```js
const rp = require('request-promise');
```

Okay, now we need to create a endpoint where the request will be made.

```js
app.get('/api/places/:name', (req, res) => {

});
```

Next, let's make the request.

```js
app.get('/api/places/:name', (req, res) => {
  rp(`http://weathers.co/api.php?city=${req.params.name}`)
    .then(function(htmlString) {
      console.log(htmlString);
    })
    .catch(function(err) {
      console.log(err);
    });
});
```

`rp` takes one arguement, the url that you want to make a request to. then we can chain on two promises

- then: will be fired if the request is successfull
- catch: will be fired if the request is unseccessfull

`rp` will return the data as a string, so if we make a request to `localhost:3000/api/places/paris` and then look at the terminal, we should see the data.

<img width="881" alt="screen shot 2017-01-12 at 11 25 28" src="https://cloud.githubusercontent.com/assets/11501555/21887913/e8c214ca-d8b9-11e6-8481-fda55aa35fe6.png">

In order to return this data to the client side correctly, we need to convert the data into JSON

```js
app.get('/api/places/:name', (req, res) => {
  rp(`http://weathers.co/api.php?city=${ req.params.name }`)
    .then(function(htmlString) {
      const json = JSON.parse(htmlString);
      return res.status(200).json(json.data);
    })
    .catch(function(err) {
      console.log(err);
    });
});
```

Great, now we can change the requesst in the `client.js` to make the request to this route.

```js
$.get(`http://localhost:3000/places/${place.name}`).done(data => {
  console.log(data);
});
```

Instead of logging the data, we now have the weather data which we can render alongside our data for the places.

```js
function init(){
  const $main = $('main');

  $.get('http://localhost:3000/api/places').done(data => {
    data.forEach(place => {
      $.get(`http://localhost:3000/api/places/${place.name}`).done(data => {
        $main.append(`
          <div class="row">
            <div class="columns three">
              ${place.name}
            </div>
            <div class="columns nine">
              ${place.nickname} is ${data.temperature} degrees with ${data.skytext}
            </div>
          </div>
          `);
      });
    });
  });
}

```

Refrssh the browser, we can now see that now have access to the weather data through an API by making a request from the server side. This is called a proxy.

![screen shot 2017-01-12 at 11 32 43](https://cloud.githubusercontent.com/assets/11501555/21888161/df0669c6-d8ba-11e6-9c12-873a4a1b91dc.png)









