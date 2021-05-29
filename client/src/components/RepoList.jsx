import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    {props.repos.map((repo) => (
      <li key={repo.repo_id}>
        <a href={repo.url}> {repo.repo_name} </a>
      </li>
    ))}
    <p></p>
    There are {props.repos.length} repos.
  </div>
)

export default RepoList;