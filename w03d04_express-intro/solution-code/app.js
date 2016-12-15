var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");

// Set the view directory to /views
app.set("views", __dirname + "/views");

// Let's use the Express templating language
app.set("view engine", "ejs");

// Setup public folder to serve static files
app.use(express.static(__dirname + "/public"));

// Setup app to parse req.body
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.all("*", function(request, response, next) {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   next();
// });

app.get("/", function(request, response) {
  response.render("index", { message: "I love coding" });
});

app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});

app.get("/hello/:who", function(request, response) {
  response.end("Hello, " + request.params.who + ".");
  // Fun fact: this has security issues
});

app.get("/go", function(request, response) {
  response.redirect("/");
});

app.get("/google", function(request, response) {
  response.redirect("http://www.google.com/");
});

app.get("/mp3", function(request, response) {
  response.sendFile(__dirname + "/Audience_Applause-Matthiew11-1206899159.mp3");
});

app.get('/posts/new', function(req, res) {
  res.render("posts/new");
});

app.post('/posts', function(req, res) {
  console.log(req.body);
});

app.get("*", function(request, response) {
  response.end("404!");
});

app.listen(3000);
console.log("Express is up and running");
