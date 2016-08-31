var expect = require('chai').expect;
var io = require('socket.io-client');

var socketURL = 'http://127.0.0.1:9000';

var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Messaging', function () {
  var client1, client2;

  var message = {
    senderId: 0,
    recipientId: -1,
    body: 'success',
    recipientType: 'U'
  }

  beforeEach(function(done) {
    client1 = io.connect(socketURL, options);

    client1.on('connect', function() {
      client1.emit('registered', 0);
      client2 = io.connect(socketURL, options);

      client2.on('connect', function() {
        client2.emit('registered', -1);
        done();
      })
    })
  });

  it('Should respond to sender with message', function(done) {
    client1.emit('send message', message);

    client1.on('get message', function(message) {
      expect(message.recipientId).to.equal(-1);
      expect(message.senderId).to.equal(0);
      expect(message.recipientType).to.equal('U');
      expect(message.body).to.equal('success');
      client1.disconnect();
      client2.disconnect();
      done();
    });
  });

  it('Should allow users to message other user directly', function(done) {
    client1.emit('send message', message);

    client2.on('get message', function(message) {
      expect(message.recipientId).to.equal(-1);
      expect(message.senderId).to.equal(0);
      expect(message.recipientType).to.equal('U');
      expect(message.body).to.equal('success');
      client1.disconnect();
      client2.disconnect();
      done();
    });
  });
});