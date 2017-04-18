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
      noCategories: [],
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

          console.log('Banned categories:', this.state.noCategories);
          console.log('Banned venues:', this.state.noVenues);

          const randomize = (data) => {
            // Find a random index based on length of places array...
            let randomIndex = Math.floor(Math.random() * data.businesses.length);
            // Choose a restaurant based on random index
            return data.businesses[randomIndex];
          }

          let place = randomize(places);

          while (
            // Check to see if user has rejected specific restaurant already, OR...
            this.state.noVenues.includes(place.name) ||
            // Check to see if user has rejected any of the categories of food.
            place.categories.some(category => this.state.noCategories.includes(category.alias))) {
            // Treasure your console logs
            console.log('REJECTED!');
            // And then pick another place at random
            place = randomize(places);
          }

          // // Set random restaurant to place in state
          this.setState({ place });
      })
    })

    .catch((err) => console.log(err));
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
              <p> Created by
              <Link to="http://alessamessineo.com"> Alessa Messineo</Link> &
              <Link to="http://marcelhamel.com"> Marcel Hamel</Link>
              </p>
            </div>
          </footer>
        <div id="loadingScreen">
          <h1>LOADING...</h1>
        </div>
      </div>
    )
  }
}
