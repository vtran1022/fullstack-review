import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    this.search = this.search.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
  }

  fetchMessages () {
    axios.get('/repos')
      .then((data) => {
        console.log(data.data);
        this.setState({ repos: data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount () {
    this.fetchMessages ();
  }

  search (term) {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:1128/repos',
      data: { 'username': term },
      success: (res) => {
        console.log('success', res);
      },
      error: (err) => {
        console.log('error', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));