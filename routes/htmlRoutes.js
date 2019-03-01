var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    /*var query = {};
    if (req.query.User_id) {
      query.UserId = req.query.User_id;
    }*/
    db.Post.findAll({
      where: { userId: 1 }
    }).then(function(data) {
      
      console.log(data[0]);
      res.render("index", { title: data[0].title, body: data[0].body });
    });
  });

  app.get("/editor", function(req, res) {
    db.Post.findOne({ where: { id: req.params.id } }).then(function(data) {
      res.render("editor", {});
    });
  });

  app.get("/create-account", function(req, res) {
    db.Post.findOne({ where: { id: req.params.id } }).then(function(data) {
      res.render("create", {});
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
