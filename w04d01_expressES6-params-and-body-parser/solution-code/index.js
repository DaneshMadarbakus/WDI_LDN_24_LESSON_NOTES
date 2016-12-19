const express    = require("express");
const morgan     = require("morgan");
const bodyParser = require("body-parser");
const app        = express();
const port       = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",          (req, res) => res.render("index"));
app.get("/users/new", (req, res) => res.render("users/new"));
app.post("/users",    (req, res) => console.log(req.body));

app.listen(port, () => console.log(`Running on port: ${port}`));
