const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true, useUnifiedTopology: true});

//define a schema
let repoSchema = mongoose.Schema({
  // _id: new ObjectID(),
  username: String, // the username we're searching for -- owner.login
  repo_name: String, // repo's name -- name
  repo_id: Number, // repo's id -- id
  url: String, // repo's html url -- html_url
  watchers: Number // repo's watcher count -- watchers_count
});

// compile our model - use this to create a document --> const newRepo = new Repo({....});
let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  console.log('save function');

  const newRepo = new Repo({
    username: repo.username,
    repo_name: repo.repo_name,
    repo_id: repo.repo_id,
    url: repo.url,
    watchers: repo.watchers
  })

  newRepo.save((err) => {
    if (err) {
      console.log(`Error saving new repo: ${err}`);
    }
  });
}

module.exports.save = save;