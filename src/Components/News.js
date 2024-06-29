import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {


  constructor() {
    super();
    this.state = {
      articales: [], // Initialize as an empty array
      loading: false
    };
  }


   async componentDidMount(){
    try{
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=a01b2d09c25b45ff98e73dfb9b2669ad";
    let data=  await fetch(url);
    let parsedData = await data.json();
    this.setState({articales: parsedData.articles });              // in the given link articles is a array which contain all data 
    }catch (error) {
          console.error('Error fetching data:', error);
        }
  }

  handleNextClick = () => {

  }

  handlePrevClick = () => {

  }

  render() {
    return (
      <div className="container my-4">
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
          {this.state.articales.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItems
                title={element.title ? element.title : ""}
                 description={element.description ? element.description : ""}    // {/* ternery operator if element.description is not null then */}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
              />
            </div>
          ))}
        </div>
        <div  className="container  d-flex justify-content-between">
        <button type="button" class="btn btn-dark" onclick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button> 

        </div>
      </div>
    );
  }
  
}

export default News

// note => 1st constructor will execute then rander function and at last componentDidMount will execute
