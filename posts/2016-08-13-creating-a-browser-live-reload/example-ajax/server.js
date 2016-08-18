var express = require('express');
var app = express();

app.use(express.static('public'));

var now = Date.now();
app.get('/live-reload', (req, res) => {
  res.json({last: now});
});

app.listen(3000, function() {
  console.log('App listening on port 3000.');
});
