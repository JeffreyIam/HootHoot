var request = require('request');

function stock(req,res){

  request('http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=' + req.body.symbol + '&callback=myFunction', function(error, response, body) {

    var seperate = body.replace('})', '}').split('myFunction(');
    var result = JSON.parse(seperate[1]);
    res.json({ text: req.body.symbol + ": " + 'Last Price: $' + result.LastPrice + ' ' +'Change: $' + result.Change.toString().slice(0,5) + ' ' + 'Open: $' + result.Open + ' ' + 'High: $' + result.High + ' ' + 'Low: $' + result.Low});
  })
}

module.exports = {stock};
