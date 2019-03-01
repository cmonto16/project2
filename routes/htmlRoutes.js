var db = require("../models");

module.exports = function(app) {

  app.get("/", function(req, res) {
    /*var query = {};
    if (req.query.User_id) {
      query.UserId = req.query.User_id;
    }*/
    db.Post.findAll({
      where: { userId: 1 }
    }).then(function(data) {

    });
  });


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

  app.get("/newpost", function(req, res) {
    res.render("newpost");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
