var db = require("../models");

module.exports = function(app) {
  app.get("/profile", function(req, res) {
    if (!req.session.user) {
      db.User.findOne({
        where: {
          id: 2
        },
        include: [db.Post]
      }).then(function(dbUser) {
        res.render("profile", {
          user: dbUser
        });
      });
    }
  });

  app.get("/posts", function(req, res) {
      res.render("posts");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
