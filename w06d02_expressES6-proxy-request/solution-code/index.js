const express     = require('express');
const morgan      = require('morgan');
const mongoose    = require('mongoose');
mongoose.Promise  = global.Promise;
const config      = require('./config/config');
const Place       = require('./models/place');
const rp          = require('request-promise');

const app         = express();

mongoose.connect(config.db);

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

app.get('/api/places/:name', (req, res) => {
  return rp(`http://weathers.co/api.php?city=${req.params.name}`)
    .then(htmlString => {
      const json = JSON.parse(htmlString);
      return res.status(200).json(json.data);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

app.get('/api/places', (req, res) => {
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

app.listen(config.port, () => {
  console.log(`Running on ${config.port}`);
});
