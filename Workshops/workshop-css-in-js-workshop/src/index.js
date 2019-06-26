import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import debounce from 'lodash.debounce';
import styled from 'styled-components';
import SearchBar from './components/search_bar';
import youtubeSearch from './youtube-api';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import NavBar from './components/nav_bar';
import Footer from './components/footer';


const VideoSection = styled.div`
  display: flex;
`;

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
        videos,
        selectedVideo: videos[0],
      });
    });
  }

  render() {
    return (
      <div>
        <div><NavBar /></div>
        <SearchBar onSearchChange={this.search} />

        <VideoSection>
          <VideoList onVideoSelect={selectedVideo => this.setState({ selectedVideo })} videos={this.state.videos} />
          <VideoDetail video={this.state.selectedVideo} />
        </VideoSection>
        <div><Footer /></div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
