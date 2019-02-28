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
};
