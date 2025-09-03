const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PAS,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,  
        port: process.env.DB_PORT,
        logging: console.log
    }
);

module.exports = sequelize;
