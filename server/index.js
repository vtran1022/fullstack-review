const express = require('express');
let app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/repos', function (req, res) {
  console.log('post', req.body.username);
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

app.use(express.static(__dirname + '/../client/dist'));

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

