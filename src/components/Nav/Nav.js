import React, { Component } from 'react';

export default class Nav extends Component {
  constructor() {
    super()

    this.state = {

      tagline: 'We Choose, You Eat'
    }
  }

  render() {
    return(
      <div>
        <div className="header">
          <h1>Chewser</h1>
          <p className='tagline'>{this.state.tagline}</p>

        </div>
      </div>
    )
  }

}
