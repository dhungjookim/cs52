import React from 'react';
import '../style.scss';

const Output = (props) => {
  if (props.audioText) {
    return <h1>{props.audioText}</h1>;
  } else {
    return (
      <div>
        <h1>{props.text}</h1>
        <b>{`Confidence level: ${props.confidenceLevel}`}</b>
      </div>
    );
  }
};

export default Output;
