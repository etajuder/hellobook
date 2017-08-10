/* eslint no-unused-vars: ["error", { "args": "none" }] */

const model = (sequelize, DataTypes) => {
    const Inventory = sequelize.define('Inventory', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        return: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    // Class Method
    Inventory.associate = (models) => {
        Inventory.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };

    return Inventory;
};

export default model;
