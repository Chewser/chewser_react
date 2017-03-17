import React, { Component } from 'react';

import Place from '../Place/Place';
import Nav from '../Nav/Nav';

export default class Main extends Component {
  constructor(props) {
    super(props);


    this.state = {
      term: 'restaurant',
      lat: '',
      long: '',
      place: {}
    }
  }

  componentDidMount() {
    console.log('Component mounted.')
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude
      })
      });
  }


  findPlaces() {
    fetch(`http://localhost:8000/restaurants/${this.state.lat}/${this.state.long}/${this.state.term}`, {
        method: 'GET'
    })
    .then(r => r.json().then(data => console.log(data)))
    .catch((err) => console.log(err));
  }


  render() {
    return(
      <div>
        <Nav />
        <button onClick={this.findPlaces.bind(this)}>FOOD NOW.</button>

        <Place place={this.state.place} />
      </div>
    )
  }
}
