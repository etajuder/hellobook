/* eslint no-unused-vars: ["error", { "args": "none" }] */

const model = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING
        },
        level: {
            type: DataTypes.STRING
        }
    });

    // Class Method
    User.associate = (models) => {
        User.hasMany(models.Inventory, { foreignKey: 'userId' });
    };

    return User;
};

export default model;
