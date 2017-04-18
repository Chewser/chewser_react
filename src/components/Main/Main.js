import React, { Component } from 'react';
import { Link } from "react-router";

import Place from '../Place/Place';
import Nav from '../Nav/Nav';

export default class Main extends Component {
  constructor(props) {
    super(props);


    this.state = {
      term: 'restaurant',
      lat: '',
      long: '',
      noCategories:
        [],
      noVenues: [],
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

    let modal = setInterval(() => {
      console.log('Checking for coordinates...')
      if(this.state.lat) {
        console.log('Found you!')
        document
          .getElementById('loadingScreen')
          .setAttribute('style', 'visibility: hidden');
        clearInterval(modal);
      }
    }, 200);
  }


  findPlaces() {
    fetch(`http://localhost:8000/restaurants/${this.state.lat}/${this.state.long}/${this.state.term}`, {
        method: 'GET'
    })
    .then((r) => {
      r.json()
        .then((places) => {

          this.randomize(places);

          // The below is our previous code to set a random restaurant...

          // // Find random index value based on length of places array...
          // const randomIndex = Math.floor(Math.random() * places.businesses.length);
          // // Place = Restaurant at randomIndex in places array...
          // const place = places.businesses[randomIndex];

          // Set random restaurant to place in state
          // this.setState({ place });
      })
    })

    .catch((err) => console.log(err));
  }

  randomize(results) {
    // Find a random index based on length of places array...
    let randomIndex = Math.floor(Math.random() * results.businesses.length);
    // Choose a restaurant based on random index
    let place = results.businesses[randomIndex];
    // Make sure it hasn't been previously rejected by user
    this.notRejected(place);
  }

  notRejected(place) {
    if (
      // If they said no to specific resturant...
      this.state.noVenues.includes(place.name) ||
      //... OR they said no to category...
      place.categories.some(category => this.state.noCategories.includes(category))) {
      //... run the randomize function again try to pick another place to eat.
      this.randomize();
    } else {
      //... if the user doesn't hate this yet, set it to state
      this.setState({ place });
    }
  }

  render() {
    return(
      <div>
        <Nav />
        <main>
          <div id="hasButton">
            <button className="searchButton" onClick={this.findPlaces.bind(this)}>FOOD. NOW.</button>
          </div>
          <Place place={this.state.place} />

        </main>
        <footer>
            <div className="otherLinks">
              <ul>
                <li><Link to="#">About</Link></li>
                <li></li>
                <li><Link to="#">Origins</Link></li>
                <li></li>
                <li><Link to="#">Yelp</Link></li>

              </ul>
              <Link to="#">Decidr</Link>
              <Link to="#">Squiddit</Link>
              <Link to="#">Remote Read</Link>
            </div>
          </footer>
        <div id="loadingScreen">
          <h1>LOADING...</h1>
        </div>
      </div>
    )
  }
}
