var GroupRoomModel = require('./groupRoomModel.js')

module.exports = {
  groupRoom: {
    get: function(req, res) {
      GroupRoomModel.findAll()
      .then(function(groups) {
        res.json(groups);
      });
    },
    post: function(req, res) {
      GroupRoomModel.findOrCreate({where: {name: req.body.name, isActive: req.body.isActive }})
      .spread(function(groups, created) {
        res.json(groups);
      });
    }
  }
}
