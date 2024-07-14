import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [], // Initialize articles as an empty array
      loading: true,
      page: 1,
      totalArticles: 0,
    };
  }


  async updateNews() {
    try {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a01b2d09c25b45ff98e73dfb9b2669ad&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);

    let parsedData = await data.json();
    this.props.setProgress(50);       // it decided to speed of top loader navbar bar

    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,                        // set loading to false after fetching data
      });                                   // in the given link articles is a array which contain all data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    this.props.setProgress(100);
  }


  async componentDidMount() {
    
    this.updateNews();
  }

  handleNextClick = async () => {
    console.log("Next page ");
    this.setState({page : this.state.page+1});
  };

  handlePrevClick = async () => {
    this.setState({page : this.state.page - 1});
  };

  fetchMoreData = async () => {
    this.setState({page : this.state.page + 1})
    
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles:this.state.articles.concat(parsedData.articles),
        totalArticles:parsedData.totalResults,
        loading: false,
      }); // in the given link articles is a array which contain all data
    

  };


  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px" }}>
          NewsMonkey - Top Headlines
        </h1>
        {this.state.loading && <Spinner />}
        {/* if this.state.loading is true than only spinner is work otherwise not    */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==  this.state.totalArticles}
          loader={<Spinner />}
        >
        <div className="container">
          <div className="row">
            { this.state.articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItems
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""} // {/* ternery operator if element.description is not null then */}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
          </div>
        </div>
        </InfiniteScroll>
        
      </>
    );
  }
}

export default News;

// note => 1st constructor will execute then rander function and at last componentDidMount will execute
