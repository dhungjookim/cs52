import React from 'react';
import styled from 'styled-components';

const VideoItem = styled.li`
 list-style: none;
 cursor: pointer;
 display: flex;
 width: 25vw;
 padding: 10px;

 :hover {
   background-color: gray;
 }
`;

const VideoListItem = (props) => {
  const imgUrl = props.video.snippet.thumbnails.default.url;

  return (
    <VideoItem onClick={() => props.onVideoSelect(props.video)}>
      <img src={imgUrl} alt="video" />
      <div>{props.video.snippet.title}</div>
    </VideoItem>
  );
};

export default VideoListItem;
