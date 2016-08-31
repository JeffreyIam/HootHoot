var expect = require('chai').expect;
var io = require('socket.io-client');

var socketURL = 'http://127.0.0.1:9000';

var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('User Registration', function () {
  it('Should register user as connected', function(done) {
    var client = io.connect(socketURL, options);
    var message = {
      senderId: 0,
      recipientId: 0,
      body: 'success',
      recipientType: 'U'
    }

    client.on('connect', function() {
      client.emit('registered', 0);
      client.emit('send message', message);
    });

    client.on('get message', function(message) {
      expect(message.body).to.equal('success');
      client.disconnect();
      done();
    });
  });
});