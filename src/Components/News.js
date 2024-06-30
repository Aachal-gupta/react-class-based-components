import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
export class News extends Component {


  constructor() {
    super();
    this.state = {
      articales: [], // Initialize as an empty array
      loading: false,
      page : 1
    };
  }


  async componentDidMount(){
    try{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a01b2d09c25b45ff98e73dfb9b2669ad&page=1&pageSize=${this.props.pageSize}`;
    let data=  await fetch(url);
    let parsedData = await data.json();
    this.setState({articales: parsedData.articles, totalArticales: parsedData.totalResults });              // in the given link articles is a array which contain all data 
    }catch (error) {
          console.error('Error fetching data:', error);
        }
  }

  handleNextClick = async () => {
    console.log('Next page ');

    if(this.state.page + 1 > Math.ceil(this.state.totalArticales/this.props.pageSize)){

    }else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a01b2d09c25b45ff98e73dfb9b2669ad&page=${ this.state.page+1}&pageSize=${this.props.pageSize}`;
      let data=  await fetch(url);
      let parsedData = await data.json();
      this.setState({
      
        page : this.state.page + 1,
        articales: parsedData.articles
      });               
      
    }

  }

  handlePrevClick = async () => {
    console.log('previous page ');
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a01b2d09c25b45ff98e73dfb9b2669ad&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      let data=  await fetch(url);
      let parsedData = await data.json();
      this.setState({

        page : this.state.page - 1,
        articales: parsedData.articles,
        
      });             
      
  }

  render() {
    return (
      <div className="container my-4">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        { this.state.Snake && <Spinner />}
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
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick }>&larr; Previous</button>
        <button  disabled={this.state.page + 1 > Math.ceil(this.state.totalArticales/this.props.pageSize)}  type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button> 

        </div>
      </div>
    );
  }
  
}

export default News

// note => 1st constructor will execute then rander function and at last componentDidMount will execute
