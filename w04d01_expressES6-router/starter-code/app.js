const express    = require("express");
const app        = express();
const bodyParser = require("body-parser");
const port       = process.env.PORT || 3000;

// Set the view directory to /views
app.set("views", `${__dirname}/views`);

// Let's use the Express templating language
app.set("view engine", "ejs");

// Setup public folder to serve static files
app.use(express.static(`${__dirname}/public`));

// Setup app to parse req.body
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => res.render("index"));

app.listen(port);
