import React, { Component } from 'react';

export default class Nav extends Component {
  constructor() {
    super()

    this.state = {

      tagline: 'We Choose, You Eat'
    }
  }

          // <h3 className='tagline'>{this.state.tagline}</h3>
  render() {
    return(
      <div>
        <div className="header">
          <h1>Chewser</h1>

        </div>
      </div>
    )
  }

}
