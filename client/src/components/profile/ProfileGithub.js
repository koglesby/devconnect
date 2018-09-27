import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;

    if (username !== '') {
      axios.get('/api/profile/github/' + username).then(res => {
        this.setState({ repos: res.data });
      });
    }
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <a href={repo.html_url} className="text-info">
              <h4>{repo.name}</h4>
            </a>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        {repos.length > 0 ? (
          <div>
            <hr />
            <h3 className="mb-4">Latest GitHub Repos</h3>
            {repoItems}
          </div>
        ) : null}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};
export default ProfileGithub;
