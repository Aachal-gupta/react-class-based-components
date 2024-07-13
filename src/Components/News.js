import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

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
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a01b2d09c25b45ff98e73dfb9b2669ad&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalArticles: parsedData.totalResults,
        loading: false,
      }); // in the given link articles is a array which contain all data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  async componentDidMount() {
    // try {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a01b2d09c25b45ff98e73dfb9b2669ad&page=1&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     articles: parsedData.articles,
    //     totalArticles: parsedData.totalResults,
    //     loading: false,
    //   }); // in the given link articles is a array which contain all data
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
    this.updateNews();
  }

  handleNextClick = async () => {
    console.log("Next page ");

    // if (
    //   this.state.page + 1 <=
    //   Math.ceil(this.state.totalArticles / this.props.pageSize)
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=a01b2d09c25b45ff98e73dfb9b2669ad&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
    this.setState({page : this.state.page+1});
    this.updateNews();
  };

  handlePrevClick = async () => {
    // if (this.state.page > 1) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=a01b2d09c25b45ff98e73dfb9b2669ad&page=${
    //     this.state.page - 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     page: this.state.page - 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }

    this.setState({page : this.state.page - 1});
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-4">
        <h1 className="text-center" style={{ margin: "35px" }}>
          NewsMonkey - Top Headlines
        </h1>
        {this.state.loading && <Spinner />}{" "}
        {/* if this.state.loading is true than only spinner is work otherwise not    */}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => (
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
        <div className="container  d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalArticles / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default News;

// note => 1st constructor will execute then rander function and at last componentDidMount will execute
