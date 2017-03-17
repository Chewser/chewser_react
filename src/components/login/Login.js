import React, { Component } from 'react';
import update from 'react-addons-update';
import { browserHistory } from 'react-router';

import Nav from '../Nav/Nav';

export default class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: {}
    }
  }

handleChange(event){
    let newState = update(this.state, {
        user: {
          $merge: {
            [event.target.name]: event.target.value
          }
        }
    });

  this.setState(newState);
} //closes handleChange

handleSubmit(event){
  event.preventDefault();
  console.log('handleSubmit is firing');

    fetch('http://localhost:8000/users/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((data) => {

      data.json()
      .then(Obj => {
        console.log('#########', Obj)
        window.localStorage.setItem('token', Obj.token);
        window.localStorage.setItem('firstname', Obj.firstname);
        window.localStorage.setItem('lastname', Obj.lastname);
        browserHistory.push('/dashboard');

      })
    })
    .catch((err) => {
      console.log(err);
    })

}//closes handleSubmit



render() {
    return(
      <div>
        <Nav />
        <h2>Login to Decidr</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Email: </label><br />
          <input name='email'
          onChange={this.handleChange.bind(this)}
          type='text' /><br /><br />

          <label>Password: </label><br />
          <input name='password'
          onChange={this.handleChange.bind(this)}
          type='password' /><br /><br />

          <button type='submit'>Login</button>

        </form>

      </div>
    )
}

} //closes class Login
