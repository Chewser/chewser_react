import React, { Component } from 'react';


class Place extends Component {
  constructor(props) {
    super(props);

    //why am i not getting this console.log?
    console.log('this.props: ', this.props)

    this.state = {
      restaurant: {}
    };

  }



  render() {

      return(
        <div>
          <h1>{this.props.place.name}</h1>
          <h2></h2>
        </div>
      )
    }
}

export default Place;
