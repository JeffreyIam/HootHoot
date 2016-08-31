var Sequelize = require('sequelize');
var MessageRecipient = require('./messageRecipientModel.js')
var db = require('../config/db.js')

var Message = db.define('Message', {
  body: Sequelize.STRING,
  senderId: Sequelize.INTEGER,
  parentMessageId: Sequelize.INTEGER,
  originChannelId: Sequelize.INTEGER,
});

Message.addMessage = function(message) {
  return Message.create({body: message.body, senderId: message.senderId})
    .then(function (messageResult) {
      return MessageRecipient.create({recipientId: message.recipientId, messageId: messageResult.id, isRead: false })
    });
}

Message.getRecent = function(user) {
  return db.query(`select m.id, m.senderId, mr.recipientId, m.body, "U" recipientType, m.createdAt messageCreated
    from MessageRecipients mr
    join Messages m on m.id=mr.messageId
    where m.senderId=:user or mr.recipientId=:user
    order by m.id desc
    limit 250`,
    { replacements: { user: user }, type: db.QueryTypes.SELECT });
}

Message.sync();
module.exports = Message;
