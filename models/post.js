module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        title: DataTypes.STRING,
        body: DataTypes.TEXT('long'),
    });
    Post.associate = (models) => {
        Post.belongsToMany(models.Category, {
            through: 'CategoryPost',
            as: 'category',
            foreignKey: 'postId'
        });
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Post;
};