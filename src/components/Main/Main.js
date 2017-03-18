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
      place: {
        name: ''
      }
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
    .then((r) => {
      r.json()
        .then((places) => {
          console.log(places);
          const randomIndex = Math.floor(Math.random() * places.businesses.length);
          console.log(randomIndex);
          const place = places.businesses[randomIndex];
          console.log(place);

          this.setState({ place });
      })
    })

    .catch((err) => console.log(err));
  }


  render() {
    return(
      <div>
        <Nav />
<<<<<<< HEAD
        <main>
          <button className="searchButton" onClick={this.findPlaces.bind(this)}>FOOD. NOW.</button>
          <Place place={this.state.place} />
        </main>
=======
        <div id='hasButton'>
          <button className="search" onClick={this.findPlaces.bind(this)}>FOOD NOW</button>
        </div>
        <Place place={this.state.place} />
>>>>>>> b09a3ba2a1bd11e09e7c5a5a5a638e79bd55584f
      </div>
    )
  }
}
