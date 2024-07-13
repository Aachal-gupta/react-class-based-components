import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {

    let {title, description, imageUrl, newsUrl, author,  date, source} = this.props;
    return (
      <div>
          <div className="card">
            <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}>
             {source}
            </span>
              <img src={!imageUrl? "https://ichef.bbci.co.uk/news/1024/branded_news/9111/live/73f7b260-350b-11ef-b606-993eb74348a6.jpg":imageUrl } className="card-img-top" alt="..."/>
              <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "Unknown": author} on {date} </small></p>
                  <a rel="noreferrer"  href={newsUrl}  className="btn  btn-sm btn-dark">Read More</a>
              </div>
          </div>
      </div>
    );
  }
  
}

export default NewsItems
