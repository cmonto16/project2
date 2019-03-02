module.exports = function (sequelize, DataTypes) {
    var CategoryPost = sequelize.define("CategoryPost", {
        postId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER
    });
    return CategoryPost;
};
