var db = require("../models");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index")
  });


  app.get("/profile", function(req, res) {
    res.render("profile")
    if (!req.session.user) {
      console.log(db.Post)
      db.User.findOne({
        where: {
          id: req.session.user.id
        },
        include: [db.Post]
      }).then(function(dbUser) {
        console.log(dbUser)
        res.render("profile", {
          user: dbUser
        });
      });
    }
  });

  app.get("/posts", function(req, res) {
      res.render("posts");
      db.Post.findAll({
        attributes: ['id', 'title', 'UserID']
      }).then(function (dbPost) {
        console.log(dbPost)
      });
  });

  app.get("/newpost", function(req, res) {
    res.render("newpost");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
