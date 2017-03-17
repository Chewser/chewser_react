import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import { browserHistory } from 'react-router';


export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }


  componentWillMount(){
    if (!localStorage.getItem('token')) {
      browserHistory.push('/login');
    }
  } // closes componentWillMount

  componentDidMount(){
    fetch('http://localhost:8000/users/restrict', {
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    })
    .then((results) => {
      results.json().then((content) => {

        console.log('content.message: ', content.message)

      })
    })
    .catch((err) => {
      console.log('fail in catch', err);
      browserHistory.push('/login');
    })
  } //closes componentDidMount





  render () {
    return (
      <div>
        <Nav />
        <h1>This is your dashboard</h1>
      </div>
    )
  }

} //closes component
