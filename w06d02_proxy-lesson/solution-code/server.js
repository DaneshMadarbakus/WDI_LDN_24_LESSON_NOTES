const express    = require('express');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const config     = require('./config/config');
const rp         = require('request-promise');
const Place      = require('./models/place');
const port       = process.env.PORT || 3000;

const app        = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.db);

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

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

app.get('/api/places', (req, res) => {
  Place
    .find()
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

app.listen(port, console.log(`The server is running on port: ${config.port}`));
