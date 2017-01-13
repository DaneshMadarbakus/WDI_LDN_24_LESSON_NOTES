const express = require('express');
const morgan  = require('morgan');
const mongoose = require('mongoose');
const port    = process.env.PORT || 3000;
const config  = require('./config/config');

const app     = express();

mongoose.connect(config.db);

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

app.get('/*', (req, res) => {
  return res.sendFile(`${__dirname}/index.html`);
});

app.listen(port, console.log(`The server is running on port: ${config.port}`));
