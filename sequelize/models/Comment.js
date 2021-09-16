const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        reported: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    });
}