var db = require("../models");


module.exports = function(app) {


  app.get("/api/posts", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });


  app.get("/api/posts/:id", function(req, res) {

    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbPost) {
      res.json(dbPost)
    })
  })


app.post("/api/posts", function(req, res) {
  db.Post.create(req.body).then(function(dbExample) {
    res.json(dbExample);
  });
});
}