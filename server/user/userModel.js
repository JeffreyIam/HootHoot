var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');
var db = require('../config/db.js')

//User Model
var User = db.define('User', {
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  isActive: Sequelize.BOOLEAN
}, {
  instanceMethods: {
    hashPassword: function() {
      var salt = bcrypt.genSaltSync(9);
      return bcrypt.hashSync(this.password, salt);
    },
    validPassword: function(inputpass, pass) {
      return bcrypt.compareSync(inputpass, pass);
    }
  }
});

User.beforeCreate(function(user, options) {
  user.password = user.hashPassword();
});

User.isActive = function(user) {
  return User.update({ isActive: true }, { where: { id: user } });
}

User.isNotActive = function(user) {
  return User.update({ isActive: false }, { where: { id: user } });
}

User.sync();
module.exports = User;
