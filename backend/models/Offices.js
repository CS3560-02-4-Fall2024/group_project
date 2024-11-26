const { DataTypes } = require('sequelize');
const sequelize = require("../database");

const Office = sequelize.define("Office", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numRooms: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Office;
