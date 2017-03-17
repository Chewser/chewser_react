import React, { Component } from 'react';


class Place extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurant: {}
    };



    // console.log('Mapkey:', mapKey);
  }


  price(n) {
    let money = "";
     if (!n) {
        money = "unavailable"
      } else {
        for (var i=0; i < n; i++){
          money += "$";
        }
      }
    return money;
  }

  handleSubmit(event){
    event.preventDefault();

    this.setState({ restaurant: this.props.place });

    fetch(`http://localhost:8000/restaurants/${localStorage.user_id}`, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      console.log('something has been favorited')
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {

      return(<div></div>)
    }
}

export default Place;
