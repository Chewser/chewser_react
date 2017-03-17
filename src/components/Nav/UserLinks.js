import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class UserLinks extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: '',
    }

  }

  componentWillMount() {
    let loggedIn = localStorage.getItem('token') ? true : false;
    this.setState({ loggedIn });
  }

  Logout () {
  localStorage.removeItem('token');
  localStorage.removeItem('firstname');
  localStorage.removeItem('lastname');
  browserHistory.push('/');
  }

  render () {
    if (this.state.loggedIn) {
      return (
        <div>
          <button><Link to="/dashboard">Dashboard</Link></button>
          <button onClick={this.Logout.bind(this)}>Logout</button>
        </div>
      )
    } else {
      return (
        <div>
          <Link to="/login">Signup/Login</Link>
        </div>
      )
    }
  }

}

export default UserLinks;
