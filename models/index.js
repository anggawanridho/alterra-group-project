const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');
const db = {};

const sequelize = new Sequelize(dbConfig.DB , dbConfig.USER , dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./user.model')(sequelize, Sequelize);

module.exports = db;