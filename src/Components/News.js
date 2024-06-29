import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {

  articales = [
    {
      "source": { "id": "bbc-sport", "name": "BBC Sport" },
      "author": null,
      "title": "India vs Afghanistan LIVE: ICC T20 World Cup 2024 - Super 8s cricket score, commentary, video highlights & updates",
      "description": "India play Afghanistan in the Men's T20 World Cup Super 8s - follow text updates, video highlights and radio commentary.",
      "url": "http://www.bbc.co.uk/sport/cricket/live/czrrvpdr1zxt",
      "urlToImage": "https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png",
      "publishedAt": "2024-06-20T15:52:23.031932Z",
      "content": "Scenes! We might have a run out at the non-striker's end here!\r\nHardik Pandya slaps it straight down the ground, Naveen-ul-Haq bends down, the ball flicks off his hand and onto the stumps.\r\nSuryakuma… [+60 chars]"
    },
    {
      "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
      "author": null,
      "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      "publishedAt": "2020-04-27T11:41:47Z",
      "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    },
    {
      "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
      "author": null,
      "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      "publishedAt": "2020-03-30T15:26:05Z",
      "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    }
  ]

  // constructor(){
  //   super();
  //   // console.log('xyz');
  //   this.state={
  //     articales : this.articales,
  //     // loading : false

  //   };
  // }


  constructor() {
    super();
    this.state = {
      articales: [], // Initialize as an empty array
      // loading: false
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


  render() {
    return (
      <div className="container my-4">
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
          {this.state.articales.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItems
                title={element.title ? element.title.slice(0, 45) : ""}
                 description={element.description ? element.description.slice(0, 88) : ""}    // {/* ternery operator if element.description is not null then */}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
}

export default News

// note => 1st constructor will execute then rander function and at last componentDidMount will execute
