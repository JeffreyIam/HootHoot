var Sequelize = require('sequelize');

var db = new Sequelize(process.env.CLEARDB_DATABASE_URL || 'mysql://hoot:hoot@localhost/hoot');

module.exports = db;
