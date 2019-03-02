var db = require("../models");

module.exports = function (app) {

  app.post("/api/create-account", function (req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function (newUser) {
      res.json(newUser);
    });
  });

  app.get("/api/users/:id", function (req, res) {

    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/users/:id", function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });
};