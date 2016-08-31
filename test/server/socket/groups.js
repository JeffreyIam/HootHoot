var expect = require('chai').expect;
var io = require('socket.io-client');

var socketURL = 'http://127.0.0.1:9000';

var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Groups', function () {
  var client1, client2;

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
  })

  it('Should alert users of new groups', function(done) {
    client1.emit('create group', [-1]);

    client2.on('join group', function(group) {
      expect(group).to.exist;
      expect(group.name).to.equal('-1, 0')
      client1.disconnect();
      client2.disconnect();
      done();
    });
  });

  it('Should alert group creator on successful group creation', function(done) {
    client1.emit('create group', [-1]);

    client1.on('join group', function(group) {
      expect(group).to.exist;
      expect(group.name).to.equal('-1, 0');
      client1.off('join group');
      done();
    });
  });
});
