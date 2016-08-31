var Sequelize = require('sequelize');
var User = require('../user/userModel.js');
var db = require('../config/db.js')

var Contacts = db.define('Contacts', {
  userOne: Sequelize.INTEGER,
  userTwo: Sequelize.INTEGER,
});

Contacts.addContact = function(userOneId, userTwoEmail) {
  var contact;

  return User.findOne({ where: { email: userTwoEmail } })
    .then(function (newContact) {
      contact = { id: newContact.id, firstname: newContact.firstname, lastname: newContact.lastname };
      return Contacts.create({ userOne: userOneId, userTwo: contact.id })
    .then(function (createdContact) {
      return new Promise(function (resolve, reject) { resolve(contact) });
    });
  });
}

Contacts.getContacts = function(user) {
  return db.query(`select u.id, u.email, u.firstname, u.lastname, u.isActive, coalesce(temp.unreadCount, 0) unreadCount
                  from Users u
                  left join
                    (select COUNT(mr.isRead) as unreadCount, m.senderId
                    from MessageRecipients mr
                    join Messages m on mr.messageId=m.id
                    where recipientId=:user and mr.isRead=0
                    group by m.senderId) temp
                  on temp.senderId=u.id
                  where u.id in (select userTwo from Contacts where userOne=:user)`,
    { replacements: { user: user }, type: db.QueryTypes.SELECT });
}

Contacts.deleteContact = function(userOne, userTwo) {
  return Contacts.destroy({ where: { userOne: userOne, userTwo: userTwo } })
    .then(function(deletedCount) {
      if (deletedCount) {
        return userTwo;
      }
    });
}

Contacts.sync();
module.exports = Contacts;
