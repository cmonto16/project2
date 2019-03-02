var express = require("express");
var session = require('express-session');
var exphbs = require("express-handlebars");

var dotenv = require('dotenv');
dotenv.config();
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);
app.set("view engine", "handlebars");

var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());


// Middleware
app.use(express.static("public"));
var sess = {
  secret: 'fihdvhefvoiehvevu;roe;bv23',
  cookie: {secure: false},
  resave: false,
  saveUninitialized: true
};
/*
if (app.get('env') === 'production') {
  sess.cookie.secure = true; // serve secure cookies, requires https
}
*/
app.use(session(sess));
var userInViews = require('./lib/middleware/userInViews');
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use(userInViews());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);

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

/*
app.use(function(req, res, next) {
  if (!req.session.user) {
    console.log("User is not logged in.");
    return res.redirect('/');
  }
  next();
});
*/

// Routes
//require("./routes/apiRoutes")(app);
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
