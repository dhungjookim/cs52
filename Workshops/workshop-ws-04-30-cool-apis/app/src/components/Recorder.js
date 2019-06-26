import React from 'react';
import { ReactMic } from 'react-mic';
import Fab from '@material-ui/core/Fab';
import '../style.scss';


export default class Recorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
    };
  }

  onStop = (recordedBlob) => {
    this.props.sendAudioBlob(recordedBlob.blob);
  }

  toggleRecording = () => {
    const { record } = this.state;

    this.setState({
      record: !record,
    });

    if (!record) {
      this.props.microphoneStarted();
    }
  }

  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          strokeColor="#000"
          backgroundColor="#fff"
        />
        <div className="fab">
          <Fab color="secondary" onClick={this.toggleRecording}>
            <i className="material-icons">{this.state.record ? 'stop' : 'mic'}</i>
          </Fab>
        </div>
      </div>
    );
  }
}
