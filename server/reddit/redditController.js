var request = require('request');

function reddit(req,res){
 request('https://www.reddit.com/r/' + req.body.subreddit + '/.json?limit=1', function(error, response, body) {
    var redditJson = JSON.parse(body);
    if(redditJson.message === 'Not Found' || redditJson.data.children.length === 0) {
      res.json({text: 'Reddit Query Not Found'});
    } else {
    var title = redditJson.data.children[0].data.title;
    var url = redditJson.data.children[0].data.url;
    res.json({ text: title + ' ' + '[:link:]' + url + '[:link:]' });
    }
  })
}

module.exports = {reddit};
