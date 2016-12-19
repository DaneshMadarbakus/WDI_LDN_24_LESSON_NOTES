const express = require('express');
const morgan  = require('morgan');

// Create an express app by invoking the express function
const app     = express();
const port    = process.env.PORT || 3000;

// The directory that we are going to put our view files in
app.set('views', `${__dirname}/views`);
// What templating engine we are going to use, http://www.embeddedjs.com/
app.set('view engine', 'ejs');

// Use morgan for logging
app.use(morgan('dev'));
// Allow files in this directory to be accessed by the public
app.use(express.static(`${__dirname}/public`));

// GET / - Our homepage
app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));

// Tell the app to listen on the port and then run a function once it has started
app.listen(port, () => console.log(`Express has started on ${port}`));
