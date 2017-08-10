/* eslint no-unused-vars: ["error", { "args": "none" }] */

const model = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        isbn: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        published: DataTypes.DATE,
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    // Class Method
    Book.associate = (models) => {
        // associate
    };

    return Book;
};

export default model;
