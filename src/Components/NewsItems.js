import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {

    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div>
            <div className="card" style={{width: "18rem"}}>
                <img src={!imageUrl? "https://ichef.bbci.co.uk/news/1024/branded_news/9111/live/73f7b260-350b-11ef-b606-993eb74348a6.jpg":imageUrl } className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                  <a  rel="noreferrer"  href={ newsUrl}  className="btn  btn-sm btn-dark">Read More</a>
                </div>
            </div>
      </div>
    );
  }
  
}

export default NewsItems
