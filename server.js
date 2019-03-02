var express = require("express");
var session = require('express-session');
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);
app.set("view engine", "handlebars");

// Middleware
app.use(express.static("public"));
app.use(session({
  secret: 'some random stuff',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require("./routes/session-api-routes")(app);
app.get("/", function(req, res) {
  res.render("index");
});

app.use(function(req, res, next) {
  if (!req.session.user) {
    console.log("User is not logged in.");
    return res.redirect('/');
  }
  next();
});

// Routes
require("./routes/apiRoutes")(app);
require("./routes/postApiRoutes")(app);
require("./routes/categoryApiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
