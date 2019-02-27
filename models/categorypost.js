module.exports = function (sequelize, DataTypes) {
    var GroupUser = sequelize.define("GroupUser", {
        postId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER
    });
    return GroupUser;
};
