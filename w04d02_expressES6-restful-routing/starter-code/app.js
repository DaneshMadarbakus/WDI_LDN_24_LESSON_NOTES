const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');
const port       = process.env.PORT || 3000;
const router     = require('./config/routes');

// Set the view directory to /views
app.set('views', `${__dirname}/views`);

// Let's use the Express templating language
app.set('view engine', 'ejs');

// Setup public folder to serve static files
app.use(express.static(`${__dirname}/public`));

// Setup app to parse req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Use ExpressEJSLayouts
app.use(ejsLayouts);

// Use the router
app.use('/', router);

// Listen on the port
app.listen(port);
