const express        = require('express');
const morgan         = require('morgan');
const bodyParser     = require('body-parser');
const ejsLayouts     = require('express-ejs-layouts');
const methodOverride = require('method-override');
const mongoose       = require('mongoose');

const app            = express();
const port           = process.env.PORT || 3000;
const databaseUrl    = 'mongodb://localhost/veganness';
const router         = require('./config/routes');

mongoose.connect(databaseUrl, () => console.log(`Connected to ${databaseUrl}`));

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride(req => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(ejsLayouts);
app.use(router);

app.listen(port, () => console.log(`Started on port: ${port}`));
