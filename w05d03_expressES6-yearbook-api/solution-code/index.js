// Require packages
const express     = require('express');
const cors        = require('cors');
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');
const app         = express();
const port        = process.env.PORT || 4000;

// Setup database
const databaseURL = process.env.PORT || 'mongodb://localhost:27017/yearbook';
mongoose.connect(databaseURL);

// Require routes
const routes      = require('./config/routes');

// Setup Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

// Listen on the correct PORT
app.listen(port, () => {
  console.log(`Express is alive and listening on port: ${port}`);
});
