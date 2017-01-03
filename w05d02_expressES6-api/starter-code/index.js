const express        = require('express');
const app            = express();
const port           = process.env.PORT || 3000;
const morgan         = require('morgan');
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');

const databaseUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/express-api';
mongoose.connect(databaseUrl);

// Use morgan for logging
app.use(morgan('dev'));

// Setup body-parser to read HTTP body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// listen on port 3000
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
