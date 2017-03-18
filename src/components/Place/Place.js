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
    console.log('PROPS: ', this.props)

    if (this.props.place.name) {

      return (
        <div className="place">
          <div className="resultContainer">
            <div className="resultText">
              <h1>{this.props.place.name}</h1>
              <p>{this.props.place.location.display_address[0]}<br />
              {this.props.place.location.display_address[1]}<br />
              {this.props.place.location.display_address[2]}<br />
              Rating: {this.props.place.rating}<br />
              Price: {this.props.place.price}<br />
              Review Count: {this.props.place.review_count}</p>
              <p>Phone: {this.props.place.display_phone}</p>
              <p><i>
                {this.props.place.categories[0].title} / {this.props.place.categories[1].title}
              </i></p>
            </div>
            <div className="resultImage">
              <img src={this.props.place.image_url} />
            </div>
          </div>
          <div className="filterControls">
            <button>Nooooo... maybe not that.</button>
            <button>Too expensive</button>
          </div>
        </div>
      )
    } else {
      return(<div></div>)

    }
  }
}

export default Place;
