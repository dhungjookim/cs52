import React from 'react';
import styled from 'styled-components';

const Detail = styled.div`
  width: 100%;
`;

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>Loading...</div>;
  } else {
  // eslint-disable-next-line prefer-destructuring
    const videoId = video.id.videoId; // will give linting error - read it and decide for yourself
    // {videoId} = video.id // is example of destructuring
    const url = `https://www.youtube.com/embed/${videoId}`;

    return (
      <Detail>
        <div className="embed-responsive embed-responsive-16by9">
          {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
          <iframe className="embed-responsive-item" src={url} />
        </div>
        <div className="details">
          <div>{video.snippet.title}</div>
          <div>{video.snippet.description}</div>
        </div>
      </Detail>
    );
  }
};

export default VideoDetail;
