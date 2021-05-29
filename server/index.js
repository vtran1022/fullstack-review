const { getReposByUsername } = require('../helpers/github.js');
const { Repo, save } = require('../database/index.js');
const express = require('express');
let app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const user = req.body.username;

  getReposByUsername(user, (results, err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      let repoList = results.map((repoObj) => {
        const repo = {
          username: repoObj.owner.login,
          repo_name: repoObj.name,
          repo_id: repoObj.id,
          url: repoObj.html_url,
          watchers: repoObj.watchers_count
        };

        return repo;
      });

      repoList.forEach((repo) => save(repo));

      res.status(200).send('database updated');
    }
  });
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

