import React from 'react';

const VideoDetail = ({ video }) => {
//   const { videoId } = video.id.videoid; // will give linting error - read it and decide for yourself
  // eslint-disable-next-line prefer-destructuring
  if (!video) {
    return <div>Loading...</div>;
  } else {
    const { videoId } = video.id; // is example of destructuring
    const url = `https://www.youtube.com/embed/${videoId}`;

    return (
      <div id="video-detail">
        <div className="embed-responsive embed-responsive-16by9">
          <iframe title="myframe" className="embed-responsive-item" src={url} />
        </div>
        <div className="details">
          <div>{video.snippet.title}</div>
          <div>{video.snippet.description}</div>
        </div>
      </div>
    );
  }
};

export default VideoDetail;
