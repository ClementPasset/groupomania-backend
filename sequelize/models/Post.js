const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imgURL: DataTypes.STRING
    });
}