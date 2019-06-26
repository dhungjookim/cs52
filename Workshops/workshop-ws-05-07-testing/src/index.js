import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import debounce from 'lodash.debounce';
import SearchBar from './components/search_bar';
import { youtubeSearch } from './youtube-api';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


// all imports go at the top

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
    };
    this.search = debounce(this.search, 300);
    this.search('pixar');
  }

  search = (text) => {
    youtubeSearch(text).then((videos) => {
      this.setState({
        videos: videos.all,
        selectedVideo: videos.all[0],
      });
    });
  };

  render() {
    return (
      <div>
        <div className="search-bar-container">
          <SearchBar id="search-bar" onSearchChange={this.search} />
        </div>
        <div id="video-section-container">
          <div id="video-section">
            <VideoDetail video={this.state.selectedVideo} />
          </div>
          <div className="video-bar" id="video-section">
            <VideoList onVideoSelect={selectedVideo => this.setState({ selectedVideo })} videos={this.state.videos} />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
