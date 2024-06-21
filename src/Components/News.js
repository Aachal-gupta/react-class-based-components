import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {
  render() {
    return (
      <div className="container my-3">
        <h2>top Headlines </h2>
        <div className="row">
            <div className="col-md-3">
                <NewsItems  title="mytitle"  description="mydesc" />
            </div>
            <div className="col-md-3">
                <NewsItems  title="mytitle"  description="mydesc" />
            </div>
            <div className="col-md-3">
                <NewsItems  title="mytitle"  description="mydesc" />
            </div>     
           
        </div>
      </div>
    )
  }
}

export default News
