var Sequelize = require('sequelize');
var db = require('../config/db.js');
var UserGroup = require('../user/userGroupModel')

var GroupRoom = db.define('GroupRoom', {
  name: Sequelize.STRING,
  isActive: Sequelize.BOOLEAN
});

// create function that receives array of participants in group
GroupRoom.addGroup = function(participants) {
  // create a new group in db
  return GroupRoom.create({ name: participants.join(', '), isActive: true })
    .then(function(group) {
      // take new group id and insert one entry per participant in usergroup
      participants.forEach(function(participant) {
        UserGroup.create({ userId: participant, groupId: group.id });
      });

      return group;
    });
}

GroupRoom.sync();
module.exports = GroupRoom;
