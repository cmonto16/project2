var db = require("../models");

module.exports = function (app) {
    // Get all Categories
    app.get("/api/categories", function (req, res) {
        db.Category.findAll({
            include: [{
                model: db.Post,
                as: 'posts',
                required: false,
                attributes: ['id'],
                through: { attributes: [] }
            }]
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    //get Category by id
    app.get("/api/categories/:id", function (req, res) {
        db.Category.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.Post,
                as: 'posts',
                required: false,
                attributes: ['id'],
                through: { attributes: [] }
            }],
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });

    //update category by id
    app.put("/api/categories/:id", function (req, res) {
        db.Category.update(req.body, {
            where: {
                id: req.params.id
            },
        }).then(function (dbPost) {
            res.json(dbPost);
        });
    });

    // Delete category by id
    app.delete("/api/categories/:id", function (req, res) {
        db.Post.destroy({ where: { id: req.params.id } }).then(function (data) {
            res.json(data);
        });
    });

    // Create new Category
    app.post("/api/categories", function (req, res) {
        console.log(req.body);
        db.Post.create(req.body).then(function (newPost) {
            res.json(newPost);
        });
    });
}