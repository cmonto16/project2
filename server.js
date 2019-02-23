var express = require("express");

var PORT = process.env.PORT || 3310;

var app = express();

app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: {
      inc: function(value, options) {
        return parseInt(value) + 1;
      }
    }
  })
);
app.set("view engine", "handlebars");

app.get("*", function(req, res) {
  res.render("index", {});
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
