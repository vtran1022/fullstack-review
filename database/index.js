const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

//define a schema
let repoSchema = mongoose.Schema({
  username: String, // the username we're searching for -- owner.login
  repo_name: String, // repo's name -- name
  repo_id: Number, // repo's id -- id
  url: String, // repo's html url -- html_url
  watchers: Number // repo's watcher count -- watchers_count
});

// compile our model - use this to create a document --> const newRepo = new Repo({....});
let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  const doesRepoExist = Repo.find({ repo_id: repo.repo_id });

  doesRepoExist.then((res) => {
    if (res.length === 0) {
      const newRepo = new Repo({
        username: repo.username,
        repo_name: repo.repo_name,
        repo_id: repo.repo_id,
        url: repo.url,
        watchers: repo.watchers
      });

      newRepo.save((err) => {
        if (err) {
          console.log(`Error saving new repo: ${err}`);
        } else {
          console.log(`Success adding new repo: ${repo.repo_name} (${repo.repo_id})`);
        }
      });
    } else {
      console.log(`Repo ${repo.repo_name} (${repo.repo_id}) already exists in database`);
    }
  });
}

module.exports = {
  Repo,
  save
};