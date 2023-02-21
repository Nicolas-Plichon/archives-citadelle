const {
    Sequelize, QueryTypes
} = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    logging: false,
    port: 5432,
});


sequelize.authenticate().then(() => {
    console.log("✅ CONNECTE A LA DB");
}).catch((err) => {
    console.log("❌ ERREUR DE CONNECTION A LA DB");
});

module.exports = sequelize;