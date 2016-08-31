var Sequelize = require('sequelize');
var db = require('../config/db.js')

var Command = db.define('Command', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  description: Sequelize.STRING,
  parameters: Sequelize.STRING,
  includeLocation: Sequelize.BOOLEAN,
  postUrl: Sequelize.STRING
});

Command.sync();
module.exports = Command;
