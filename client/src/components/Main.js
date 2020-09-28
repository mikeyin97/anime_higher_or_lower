import React, { Component } from 'react';
import axios from 'axios';
import '../public/stylesheets/SearchTable.css';
import { FormCheck } from 'react-bootstrap';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      animeScore: 0,
      prevAnime: {
        index: 0,
        name: "HI",
        score: 0,
        img: "",
      },
      currAnime: {
        index: 1,
        name: "Hello",
        score: 0,
        img: ""
      },
      loading: true,
      correct: true,
      data: [],
    };
    this.handleData = this.handleData.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.remount = this.remount.bind(this);
    this.check = this.check.bind(this);
  }

  componentDidMount = () => {
    var query =  `query($page: Int) {
      Page (page: $page) {
        media (type: ANIME, startDate_greater:20060000, popularity_greater:10000, format_in:[TV], status_in:[FINISHED]) {
          id
          title {
            romaji
            english
            native
          }
          popularity
          averageScore
          coverImage {
            extraLarge
            large
            medium
            color
          }
        }
        pageInfo {
          perPage
          currentPage
          lastPage
          total
          hasNextPage
        }
      }
    }`;

    var page = Math.floor(Math.random() * 21); 
    var variables = {
      page: page
    };

    var url = 'https://graphql.anilist.co'
    
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

    fetch(url, options).then(this.handleResponse)
                   .then(this.handleData)
                   .catch(this.handleError);

  }

  remount = () => {
    var query =  `query($page: Int) {
      Page (page: $page) {
        media (type: ANIME, startDate_greater:20060000, popularity_greater:10000, format_in:[TV], status_in:[FINISHED]) {
          id
          title {
            romaji
            english
            native
          }
          popularity
          averageScore
          coverImage {
            extraLarge
            large
            medium
            color
          }
        }
        pageInfo {
          perPage
          currentPage
          lastPage
          total
          hasNextPage
        }
      }
    }`;

    var page = Math.floor(Math.random() * 21); 
    var variables = {
      page: page
    };

    var url = 'https://graphql.anilist.co'
    
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

    fetch(url, options).then(this.handleResponse)
                   .then(this.handleData)
                   .catch(this.handleError);

  }

  handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
  }

  handleData(data) {
    var animeData = data.data.Page.media;
    this.shuffleArray(animeData);
    this.setState({prevAnime: {
      index: 0,
      name: animeData[0].title.romaji,
      score: animeData[0].averageScore,
      img: animeData[0].coverImage.extraLarge
      }}
    );
    this.setState({currAnime: {
      index: 1,
      name: animeData[1].title.romaji,
      score: animeData[1].averageScore,
      img: animeData[1].coverImage.extraLarge
      }}
    );
    this.setState({data: animeData})
    this.setState({loading: false});
    
  }

  handleError(error) {
      alert('Error, check console');
      console.error(error);
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  check(e) {
    if (this.state.currAnime.score > this.state.prevAnime.score){
      if (e.target.value === "+1"){
        this.setState({score: this.state.score + 1});
        var currIndex = this.state.currAnime.index + 1;
        var prevIndex = this.state.prevAnime.index + 1;
        
        this.setState({prevAnime: {
          index: prevIndex,
          name: this.state.data[prevIndex].title.romaji,
          score: this.state.data[prevIndex].averageScore,
          img: this.state.data[prevIndex].coverImage.extraLarge
          }}
        );
        
        this.setState({currAnime: {
          index: currIndex,
          name: this.state.data[currIndex].title.romaji,
          score: this.state.data[currIndex].averageScore,
          img: this.state.data[currIndex].coverImage.extraLarge
          }}
        );
        if (currIndex === this.state.data.length - 1){
          this.remount()
        }
      }

      else {
        this.setState({score: 0});
        this.remount();
      }
    }
    else if (this.state.currAnime.score === this.state.prevAnime.score){
      if (e.target.value === "0"){
        this.setState({score: this.state.score + 1});
        var currIndex = this.state.currAnime.index + 1;
        var prevIndex = this.state.prevAnime.index + 1;
        
        this.setState({prevAnime: {
          index: prevIndex,
          name: this.state.data[prevIndex].title.romaji,
          score: this.state.data[prevIndex].averageScore,
          img: this.state.data[prevIndex].coverImage.extraLarge
          }}
        );
        
        this.setState({currAnime: {
          index: currIndex,
          name: this.state.data[currIndex].title.romaji,
          score: this.state.data[currIndex].averageScore,
          img: this.state.data[currIndex].coverImage.extraLarge
          }}
        );
        if (currIndex === this.state.data.length - 1){
          this.remount()
        }
      }
      else {
        this.setState({score: 0});
        this.remount()
      }
    }
    else if (this.state.currAnime.score < this.state.prevAnime.score){
      if (e.target.value === "-1"){
        this.setState({score: this.state.score + 1});
        var currIndex = this.state.currAnime.index + 1;
        var prevIndex = this.state.prevAnime.index + 1;
        
        this.setState({prevAnime: {
          index: prevIndex,
          name: this.state.data[prevIndex].title.romaji,
          score: this.state.data[prevIndex].averageScore,
          img: this.state.data[prevIndex].coverImage.extraLarge
          }}
        );
        
        this.setState({currAnime: {
          index: currIndex,
          name: this.state.data[currIndex].title.romaji,
          score: this.state.data[currIndex].averageScore,
          img: this.state.data[currIndex].coverImage.extraLarge
          }}
        );
        if (currIndex === this.state.data.length - 1){
          this.remount()
        }
      }
      else {
        this.setState({score: 0});
        this.remount()
      }
    }
  }



  render() {
    if (this.state.loading === true){
      return <div id="page2">
        loading
      </div>
    }
    var style1 = {
      "backgroundImage": "url(" +  this.state.prevAnime.img + ")",
      "backgroundSize": "cover",
      "backgroundRepeat": "no-repeat",
      "background-blend-mode": "multiply",

    };
    var style2 = {
      backgroundImage: "url(" + this.state.currAnime.img + ")",
      "backgroundSize": "cover",
      "backgroundRepeat": "no-repeat",
      "background-blend-mode": "multiply",
    };

    return <div id="page">
      <div id="left" style={style1}>
      <div id="score"><h1>Current Score: {this.state.score}</h1></div>

      <div className="centre" >
        <h1>{this.state.prevAnime.name}</h1>
        <h2> has a rating of</h2>
        <h1>{this.state.prevAnime.score}</h1>
      </div>
        

      </div>
      <div id="right" style={style2}>


      <div className="centre">
        <h1>{this.state.currAnime.name}</h1>
        <h2> has a rating that is </h2>
        <button value="+1" onClick={this.check}>higher</button>
        <button value="0" onClick={this.check}>equal</button>
        <button value="-1" onClick={this.check}>lower</button>

        <h2></h2>
      </div>
        
      </div>
    </div>
  }
}

export default Header