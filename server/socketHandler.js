var server = require('./server');
var GroupRoom = require('./group/groupRoomModel.js');
var User = require('./user/userModel.js');
var Message = require('./message/messageModel.js');
var MessageRecipient = require('./message/messageRecipientModel.js')
var request = require('request');
var connectedUsers = {};
var accessToken = process.env.WIT;

var register = function(profile) {
  User.isActive(profile);

  connectedUsers[profile] = this;
  this.userId = profile;

  // should be refactored to only target contacts
  server.io.sockets.emit('online', profile);
}

var isConnected = function(userId) {
  return userId in connectedUsers;
}

exports.newConnection =  function (socket) {
  socket.on('registered', register.bind(socket));

  socket.on('send message', function (message) {
    var sender = message.senderId;
    var recipient = message.recipientId;
    var recipientType = message.recipientType;

    Message.addMessage(message)
      .then(function (result) {
        message.messageCreated = result.createdAt;

        if (recipientType === 'G') {
          server.io.to(recipient).emit('get message', message);
        } else if (recipientType === 'U') {
          connectedUsers[sender].emit('get message', message);
          if (isConnected(recipient)) {
            connectedUsers[recipient].emit('get message', message);
          }
        }

        return message;
      })
      // .then(function (message) {
      //   request.get({ url: 'https://api.wit.ai/message', qs: { v: '20160810', q: message.body },
      //     auth: { bearer: accessToken } }, function (err, resp) {
      //       var entities = JSON.parse(resp.body).entities;

      //       if (entities.location) {
      //         var loc = entities.location.reduce((loc, piece) => loc === '' ? loc + piece.value : loc + ` ${piece.value}`, '');

      //         loc = `https://m.uber.com/ul?client_id=xvr7xvjsRimtJsq6Xl_MJ4vJK-lwZsK1&action=setPickup&pickup=my_location&dropoff=${encodeURI(loc)}`

      //         message.body = '[:uber:]' + loc + '[:uber:]';

      //         if (recipientType === 'G') {
      //           server.io.to(recipient).emit('get message', message);
      //         } else if (recipientType === 'U') {
      //           connectedUsers[sender].emit('get message', message);
      //           if (isConnected(recipient)) {
      //             connectedUsers[recipient].emit('get message', message);
      //           }
      //         }
      //       }
      //     }
      //   );
      // });
  });

  socket.on('create group', function (group) {
    group.push(socket.userId);
    // create group in database
    GroupRoom.addGroup(group)
      .then(function(groupId) {
        // tell each member in group to listen for messages on that group id
        group.forEach(function (participant) {
          if(isConnected(participant)){
            connectedUsers[participant].emit('join group', groupId);
          }
        })
      });
  });

  socket.on('mark read', function(list) {
    MessageRecipient.markRead(list);
  });

  socket.on('typing status', function(recipient, state) {
    if(isConnected(recipient)) {
      connectedUsers[recipient].emit('typing', socket.userId, state);
    }
  });

  socket.on('disconnect', function() {
    User.isNotActive(socket.userId);
    // should be refactored to only target contacts
    server.io.sockets.emit('offline', socket.userId);

    delete connectedUsers[socket.userId];
  })
};
