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
      categories: ['afgani', 'african', 'sengalese', 'southafrican', 'newamerican', 'tradamerican', 'andalusian', 'arabian', 'argentine', 'armenian', 'asianfusion', 'asturian', 'australian', 'austrian', 'bangladeshi', 'bbq', 'basque', 'brazilian', 'british', 'buffets', 'burgers', 'burmese', 'cajun', 'cambodian', 'carribean', 'catalan', 'cheesesteaks', 'chickenshop', 'chicken_wings', 'chinese', 'comfortfood', 'cuban', 'czech', 'diners', 'dinnertheater', 'ethiopian', 'hotdogs', 'filipino', 'fishnchips', 'foodcourt', 'fondue', 'french', 'german', 'greek', 'guamanian', 'halal', 'hawaiian', 'himalayan', 'honduran', 'hkcafe', 'hotdog', 'hungarian', 'iberian', 'indpak', 'indonesian', 'irish', 'italian', 'japanese', 'kebab', 'korean', 'kosher', 'laotian', 'latin', 'raw_food', 'malaysian', 'mediterranean', 'mexican', 'mideastern', 'lebanese', 'mongolian', 'moroccan', 'newmexican', 'nicaraguan', 'noodles', 'pakistani', 'panasian', 'peruvian', 'pizza', 'polish', 'portugese', 'russian', 'salad', 'sandwiches', 'scandanavian', 'scottish', 'seafood', 'singaporean', 'slovakian', 'soulfood', 'soup', 'southern', 'spanish', 'srilankan', 'steak', 'sushi', 'syrian', 'taiwanese', 'tapas', 'tapasmallplates', 'tex-mex', 'thai', 'turkish', 'ukranian', 'uzbek', 'vegan', 'vegetarian', 'vietnamese', 'waffles', 'wraps'],
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
