var Yelp = require('yelp');
var keys = require('../config/keys');

exports.searchYelp= function(searchParameter) {
  var yelp = new Yelp({
    consumer_key: keys.oauth_consumer_key,
    consumer_secret: keys.consumerSecret,
    token: keys.oauth_token,
    token_secret: keys.tokenSecret,
  });


  // See http://www.yelp.com/developers/documentation/v2/search_api
  return yelp.search({ term: searchParameter.searchTerm, location: searchParameter.location })
  .then(function (data) {
    return data;
  })
  .catch(function (err) {
    console.error(err);
  });

  // See http://www.yelp.com/developers/documentation/v2/business
  yelp.business('yelp-san-francisco')
    .then(console.log)
    .catch(console.error);

  yelp.phoneSearch({ phone: '+15555555555' })
    .then(console.log)
    .catch(console.error);

  // A callback based API is also available:
  yelp.business('yelp-san-francisco', function(err, data) {
    if (err) return console.log(error);
    console.log(data);
  });

}
