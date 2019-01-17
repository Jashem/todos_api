var express = require("express"),
  app = express(),
  passport = require("passport"),
  port = 3000;

var bodyParser = require("body-parser");
var cookieSession = require("cookie-session");
var expressSanitizer = require("express-sanitizer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
var todoRoutes = require("./routes/todos");
var authGoogle = require("./routes/auth-google");
var authFacebook = require("./routes/auth-facebook");

app.use(
  cookieSession({
    keys: ["Uchungachungu"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/google", authGoogle);
app.use("/auth/facebook", authFacebook);

app.use("/api/todos", todoRoutes);

app.get("/", function(req, res) {
  res.redirect("/login");
});

app.get("/todos", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("todos");
  } else {
    res.redirect("/");
  }
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.listen(process.env.port, function() {
  console.log("listening to port:" + port);
});
