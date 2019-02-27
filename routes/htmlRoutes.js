var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Post.findAll({}).then(function(kidsthesedays) {
      res.render("index", {
        activity: "kidsthesedays"
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/Post/:id", function(req, res) {
    db.Post.findOne({ where: { id: req.params.id } }).then(function(kidsthesedays) {
      res.render("Post", {
        Post: "kidsthesedays"
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
