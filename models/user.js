module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstname: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        lastname: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        }
    });
    User.associate = (models) => {
        User.belongsToMany(models.Group, {
            through: 'GroupUser',
            as: 'group',
            foreignKey: 'userId'
        });
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };
    return User;
};