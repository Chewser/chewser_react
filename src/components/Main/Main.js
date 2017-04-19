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



  /* FIX: App can still crash when too many options are banned. We need to rethink how we're banning
  categories. Maybe cap it at three or something or give it an option to reset and display a message
  to the user. Otherwise this thing will just keep rejecting everything and sending a new fetch request
  in an infinite loop. */

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
          let counter = 0;
          let escapeLoop = false;

          while (
            // Check to see if user has rejected specific restaurant already, OR...
            this.state.noVenues.includes(place.name) ||
            // Check to see if user has rejected any of the categories of food.
            place.categories.some(category => this.state.noCategories.includes(category.alias))) {
            // Treasure your console logs
            console.log('REJECTED!');
            // And then pick another place at random
            place = randomize(places);
            counter ++;
            if (counter > 19) {
              console.log('Ran through all results. Fetching again...');
              escapeLoop = true;
              this.findPlaces();
            }
          }

          // This may be redundant
          escapeLoop = false;
          // Set random restaurant to place in state
          this.setState({ place });
      })
    })

    .catch((err) => console.log(err));
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
        this.findPlaces();
      }
    }, 200);

  }

  // Callback function passed to Place component to hoist state
  banCategory() {
    // Defines a new array based on banned categories in state
    const arr = this.state.noCategories;
    // Combines previous array with new category to be banned
    const noCategories= arr.concat(this.state.place.categories[0].alias);
    // Sets new product of concat as state
    this.setState({ noCategories });
    // Runs a new fetch request
    this.findPlaces();
  }

  banVenue() {
    // Defines a new array based on banned venues in state
    const arr = this.state.noVenues;
    // Combines previous array with new venue to be banned
    const noVenues= arr.concat(this.state.place.name);
    // Sets new product of concat as state
    this.setState({ noVenues });
    // Runs a new fetch request
    this.findPlaces();
  }


  render() {
    return(
      <div>
        <Nav />
        <main>


          <Place place={this.state.place} banVenue={this.banVenue.bind(this)} banCategory={this.banCategory.bind(this)} />

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
          <h1 className="finding">Finding food...</h1>
        </div>
      </div>
    )
  }
}
