var db = require("../models");

module.exports = function (app) {

  //get all posts
  app.get("/api/posts", function (req, res) {
    db.Post.findAll({
      attributes: ['id', 'title', 'UserID'],
      include: [
        {
          model: db.Category,
          as: 'category',
          required: false,
          attributes: ['id', 'category'],
          through: { attributes: [] }
        }
      ]
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  //get post by id
  app.get("/api/posts/:id", function (req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: db.User,
        attributes: ['id']
      },
      {
        model: db.Category,
        as: 'category',
        required: false,
        attributes: ['id', 'category'],
        through: { attributes: [] }
      }
      ]
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  //update post by id
  app.put("/api/posts/:id", function (req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.params.id
      },
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });


  // Delete post by id
  app.delete("/api/posts/:id", function (req, res) {
    db.Post.destroy({ where: { id: req.params.id } }).then(function (data) {
      res.json(data);
    });
  });

  // Create new Post
  app.post("/api/posts", function (req, res) {
    console.log(req.body);
    db.Post.create(req.body).then(function (newPost) {
      res.json(newPost);
    });
  });

  //add post category by id
  app.post("/api/posts/:id/categories/:catid", function (req, res) {
    db.CategoryPost.create({
      postId: req.params.id,
      categoryId: req.params.catid,
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  //remove post category by id
  app.delete("/api/posts/:id/categories/:catid", function (req, res) {
    db.CategoryPost.destroy({
      where: {
        postId: req.params.id,
        categoryId: req.params.catid,
      }
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });


   // redierect for users to create post
   app.get("/api/create_post", function(req, res){
     
    res.redirect("/newpost")
  })
 
};