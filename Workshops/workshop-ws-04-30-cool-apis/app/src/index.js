import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormData from 'form-data';
import Recorder from './components/Recorder';
import Output from './components/Output';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      audioText: 'click the microphone to record some audio!',
      audioBlob: null,
      text: '',
      confidenceLevel: null,
    };
  }

  handleLoading = () => {
    if (this.state.loading) {
      return <CircularProgress color="secondary" />;
    }
    return <Recorder microphoneStarted={this.microphoneStarted} sendAudioBlob={this.getAudioBlob} />;
  }

  microphoneStarted = () => {
    this.setState({
      audioText: 'listening...',
    });
  }

  getAudioBlob = (blob) => {
    this.setState({
      audioBlob: blob,
    });

    this.sendRequest();
  }

  sendRequest = () => {
    this.setState({
      audioText: 'sending a request to IBM Watson...',
    }, () => {
      const URL = 'http://localhost:9090/';

      const formData = new FormData();
      formData.append('file', this.state.audioBlob, 'recording.webm');

      const request = new XMLHttpRequest();

      request.onload = () => {
        if (request.response !== undefined) {
          const outputFromIBM = request.response.results[0].alternatives[0];

          this.setState({
            text: outputFromIBM.transcript,
            confidenceLevel: outputFromIBM.confidence,
            audioText: null,
          });
        }
      };

      request.open('POST', URL, true);
      request.responseType = 'json';
      request.send(formData);
    });
  }

  render() {
    return (
      <div className="container">
        <Output audioText={this.state.audioText} text={this.state.text} confidenceLevel={this.state.confidenceLevel} />
        {this.handleLoading()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
