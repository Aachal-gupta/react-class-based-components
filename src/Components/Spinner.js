import React, { Component } from 'react'
import Snake from './Snake.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center my-4" style={{color:'red'}}>
        <img
          src={Snake} 
          alt="Snake" 
          style={{ width: '40px', height: '40px' }} />
      </div>
    )
  }
}

export default Spinner
