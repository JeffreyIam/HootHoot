var Sequelize = require('sequelize');
var db = require('../config/db.js')

var UserGroup = db.define('UserGroup', {
  userId: Sequelize.INTEGER,
  groupId: Sequelize.INTEGER
});

UserGroup.sync();
module.exports = UserGroup;
