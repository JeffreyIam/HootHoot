var jwt = require('jsonwebtoken');
var secret = 'secret';

module.exports = {

  //token authentication
  authorize: function(req, res, next) {
    var token = req.body.token || req.headers['x-access-token'];
    if(token) {
      jwt.verify(token, 'secret', function(err, decoded) {
        if(err) {
          console.log('JWT could not verify', err);
          return res.status(403).send(err);
        } else {
          console.log('decoded')
          req.decoded = decoded;
          return next();
         // return res.status(200).send('ok');
        }
      });
    }
    else {
      res.status(403).send('No token provided');
    }
  }
}
