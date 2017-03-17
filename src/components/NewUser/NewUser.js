import React, { Component } from 'react';
import update from 'react-addons-update';
import { browserHistory } from 'react-router';

import Nav from '../Nav/Nav';

export default class NewUser extends Component {
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

    fetch('http://localhost:8000/users', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      browserHistory.push('/login');
      console.log('new user created')
    })
    .catch((err) => {
      console.log(err);
    })

}//closes handleSubmit

render() {
    return(
      <div>
        <Nav />
        <h2>Welcome to Decidr</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>First Name:</label><br />
          <input name="first_name"
          onChange={this.handleChange.bind(this)}
          type='text' /><br /><br />

          <label>Last Name:</label><br />
          <input name="last_name"
          onChange={this.handleChange.bind(this)}
          type='text' /><br /><br />

          <label>Email: </label><br />
          <input name="email"
          onChange={this.handleChange.bind(this)}
          type='text' /><br /><br />

          <label>Password: </label><br />
          <input name="password"
          onChange={this.handleChange.bind(this)}
          type='password' /><br /><br />

          <button type="submit">Submit</button>

        </form>

      </div>
    )
}

} //Closes component
