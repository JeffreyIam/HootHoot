var Message = require('./messageModel.js')

module.exports = {
  message: {
      get: function(req, res) {
        var user = req.decoded;

        Message.getRecent(user.id)
          .then(function(messages) {
            res.json(messages);
          })
      },
      post: function(req, res) {
        Message.findOrCreate({where: {body: req.body.body,senderId: req.body.senderId, parentMessageId: req.body.parentMessageId, originChannelId: req.body.originChannelId }})
        .spread(function(message, created) {
          res.json(message);
        });
      }
    }
}
