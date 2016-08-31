var Commands = require('./commandModel.js');
var storedCommands = [];

Commands.findAll({ raw: true })
  .then(function(commands) {
    storedCommands = storedCommands.concat(commands);
  });

module.exports = {
  commands: {
    get: function(req, res) {
      res.json(storedCommands);
    },
    post: function(req, res) {
      Commands.findOrCreate({where: {name: req.body.name},
        defaults: {description: req.body.description, parameters: req.body.parameters, includeLocation: req.body.includeLocation, postUrl: req.body.postUrl} })
        .spread(function(command, created) {
          storedCommands.push(command);
          res.json(command);
        });
    }
  }
}
