var db = require('../../server/config/db');

after(function(done) {
  removeMessages()
    .then(function() {
      done();
    });
})

function removeMessages() {
  return db.query('delete from Messages where senderId in (-1, 0)')
    .then(function() {
      return db.query('delete from MessageRecipients where recipientId in (-1, 0)');
    });
}