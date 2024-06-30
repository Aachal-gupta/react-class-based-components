import React, { Component } from 'react'
import Snake from './Snake.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={Snake}  alt="Snake"  />
      </div>
    )
  }
}

export default Spinner
