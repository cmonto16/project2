var db = require("../models");

module.exports = function(app) {
  // Get all
  app.get("/api/Post", function(req, res) {
    var query = {};
    if (req.query.User_id) {
      query.UserId = req.query.User_id;
    }
    db.Post.findAll({
      where: query,
      include: [db.User, db.group]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Create new
  app.post("/api/new", function(req, res) {
    console.log(req.body);
    db.Post.create(req.body).then(function(newPost) {
      res.json(newPost);
    });
  });

  app.post("/api/create-account", function(req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function(newUser) {
      res.json(newUser);
    });
  });

  // Delete by id
  app.delete("/api/Post/:id", function(req, res) {
    db.Post.destroy({ where: { id: req.params.id } }).then(function(data) {
      res.json(data);
    });
  });
};
