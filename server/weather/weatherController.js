var request = require('request');

function weather(req,res, Globals){

  console.log(req.body.location, '$$$$$')
  request('http://api.openweathermap.org/data/2.5/weather?q=' + req.body.location + '&APPID=6a80ac1b8d42f26414a494d1e7c51ebb', function(error, response, body) {
    var temperature = JSON.parse(body).main.temp.toString();
    res.json({ text: req.body.location + ": " + (temperature * (9/5) - 459.67).toString().slice(0,5) + "°F" });
  })
}

module.exports = {weather};


