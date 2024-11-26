const { Sequelize } = require("sequelize");
require('dotenv').config();

// use sequelize to create a connection to the db
const sequelize = new Sequelize(process.env.DB_TABLE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

module.exports = sequelize;

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection  has been established.');
    } catch (error) {
        console.error('Unable', error);
    }
}

testConnection();

