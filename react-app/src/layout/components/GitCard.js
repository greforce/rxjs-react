import React, { Component } from 'react'

export class GitCard extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="card" style={{ width: '18rem' }}>
        <img className="card-img-top" src={user.avatar_url} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{user.login}</h5>
          <a href={user.html_url} className="btn btn-primary">GitHub profile</a>
        </div>
      </div>
    )
  }
}
