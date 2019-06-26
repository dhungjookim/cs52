import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import debounce from 'lodash.debounce';
import youtubeSearch from './youtube-api';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import VideoList from './components/video_list';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      selectedNote: null,
    };
  }

  render() {
    return (
      <div>
        <div id="search-bar">
          <SearchBar onSearchChange={this.search} />
        </div>
        <div id="video-section">
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList onVideoSelect={selectedVideo => this.setState({ selectedVideo })} videos={this.state.videos} />
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
