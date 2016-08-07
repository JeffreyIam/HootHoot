var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var db = new Sequelize(process.env.CLEARDB_DATABASE_URL || 'mysql://hoot:hoot@localhost/hoot');

//define models we need
var User = db.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING
}, {
  instanceMethods: {
    hashPassword: function() {
      var salt = bcrypt.genSaltSync(9);
      return bcrypt.hashSync(this.password, salt)
    },
    validPassword: function(inputpass, pass) {
      return bcrypt.compareSync(inputpass, pass);
    }
  }
});

User.beforeCreate(function(user, options) {
  user.password = user.hashPassword();
});

User.sync();

var Message = db.define('Message', {
  body: Sequelize.STRING,
  senderId: Sequelize.STRING,
  parentMessageId: Sequelize.INTEGER,
  originChannelId: Sequelize.INTEGER,
});

var MessageRecipient = db.define('MessageRecipient', {
  recipientId: Sequelize.STRING,
  recipientGroupId: Sequelize.INTEGER,
  messageId: Sequelize.INTEGER,
  isRead: Sequelize.BOOLEAN
});

Message.addMessage = function(message) {
  return Message.create({body: message.body, senderId: message.senderId})
    .then(function (messageResult) {
      return MessageRecipient.create({recipientId: message.recipientId, messageId: messageResult.id})
    });
}

Message.sync();
MessageRecipient.sync();

var GroupRoom = db.define('GroupRoom', {
  name: Sequelize.STRING,
  isActive: Sequelize.INTEGER
});

GroupRoom.sync();

var UserGroup = db.define('UserGroup', {
  userId: Sequelize.INTEGER,
  groupId: Sequelize.INTEGER
});

UserGroup.sync();

var Contacts = db.define('Contacts', {
  userOne: Sequelize.STRING,
  userTwo: Sequelize.STRING,
});

Contacts.sync();


// Declare Relationships between Models
User.hasMany(Message);
Message.belongsTo(User);
//UserGroup.hasMany(User);
UserGroup.hasMany(GroupRoom);

exports.Contacts = Contacts;
exports.GroupRoom = GroupRoom;
exports.UserGroup = UserGroup;
exports.Message = Message;
exports.User = User;


