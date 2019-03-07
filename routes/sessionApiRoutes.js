var db = require("../models");

module.exports = function(app) {
  app.post("/api/sessions", function(req, res) {
    var query = {
      username: req.body.username,
      password: req.body.password
    };

    db.User.findOne({
      where: query
    }).then(function(dbUser) {
      if (dbUser) {
        req.session.user = dbUser;
        return res.json({});
      }
      return res.status(400).json({})
    });
  });

  app.get("/api/sessions_logout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect('/');
    });
  });

  app.delete("/api/sessions", function(req, res) {
    req.session.destroy(function(err) {
      res.json({});
    });
  });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      req.session.user = dbUser;
      res.json(dbUser);
    });
  });

  app.post("/api/create-account", function (req, res) {

    db.User.create(req.body).then(function (newUser) {
      res.json(newUser);
    });
  });
  
  app.get("/api/users", function(req, res) {
    db.User.findAll({
      include: [db.Post, {
        model: db.Group,
        as: 'groups',
        required: false,
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }]
    }).then(function(dbUser) {
      res.json(dbUser);
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

  app.put("/api/users", function(req, res) {
    db.User.findOne({
      where: {
        id: req.session.user.id
      }
    }).then(function(dbUser) {
      var body = req.body;
      dbUser.firstname = body.firstname;
      dbUser.lastname = body.lastname;
      dbUser.username = body.username;
      if (body.password) {
        dbUser.password = body.password;
      }
      dbUser.email = req.body.email;
      dbUser.save().then(function() {
        res.json(dbUser);
      });
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
