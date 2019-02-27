var db = require("../models");

module.exports = function(app) {
  // Get all 
  app.get("/api/Post", function(req, res) {
    db.Post.findAll({
      // add struff here
    }).then(function(kidsthesedays) {
      res.json(kidsthesedays);
    });
  });

  // Create new 
  app.post("/api/Post", function(req, res) {
    db.Post.create(req.body).then(function(kidsthesedays) {
      res.json(kidsthesedays);
    });
  });

  // Delete by id
  app.delete("/api/Post/:id", function(req, res) {
    db.Post.destroy({ where: { id: req.params.id } }).then(function(kidsthesedays) {
      res.json(kidsthesedays);

    });
  });
};
