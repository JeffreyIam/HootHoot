function wiki(req,res){
  res.json({ text: '[:frame:]https://en.wikipedia.org/wiki/Special:Search/' + req.body.searchTerm + '[:frame:]' });
}

module.exports = wiki;