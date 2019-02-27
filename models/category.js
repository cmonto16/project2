module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        category: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        }
    });
    Category.associate = (models) => {
        Category.belongsToMany(models.Post, {
            through: 'CategoryPost',
            as: 'posts',
            foreignKey: 'categoryId'
        });
    };
    return Category;
};