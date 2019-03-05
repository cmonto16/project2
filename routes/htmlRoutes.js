var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    if (!req.session.user) {
      return res.render("posts");
    }
    db.User.findOne({
      where: {
        id: req.session.user.id
      }
    }).then(function(dbUser) {
      res.render("posts", {
        user: dbUser
      });
    });
  });

  app.get("/register", function(req, res) {
    res.render("register");
  });

  app.get("/newpost", function(req, res) {
    res.render("newpost");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
