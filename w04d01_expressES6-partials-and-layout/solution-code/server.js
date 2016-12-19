const express        = require('express');
const expressLayouts = require('express-ejs-layouts');
const ejs            = require('ejs');
const port           = process.env.PORT || 3000;
const app            = express();

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/public`));
app.use(expressLayouts);

app.get('/',        (req,res) => res.render('home'));
app.get('/about',   (req,res) => res.render('about'));
app.get('/contact', (req,res) => res.render('contact'));

app.listen(port);
