var db = require('../config/db.js')
var Sequelize = require('sequelize');


var MessageRecipient = db.define('MessageRecipient', {
  recipientId: Sequelize.INTEGER,
  recipientGroupId: Sequelize.INTEGER,
  messageId: Sequelize.INTEGER,
  isRead: Sequelize.BOOLEAN
});

MessageRecipient.markRead = function(list) {
  return MessageRecipient.update({ isRead: true }, { where: { messageId: list } });
}

MessageRecipient.sync();
module.exports = MessageRecipient;
