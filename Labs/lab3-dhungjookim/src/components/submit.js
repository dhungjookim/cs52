import React, { Component } from 'react';
import * as db from '../services/datastore';


class Submit extends Component {
  constructor(props) {
    super(props);

    this.state = { submitterm: '' };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ submitterm: event.target.value });
  }

  addNote = () => {
    db.createNote(this.state.submitterm);
    this.setState({ submitterm: '' });
  }

  render() {
    return (
      <div>
        <div>
          <input onChange={this.onInputChange} value={this.state.submitterm} />
        </div>
        <div>
          <button type="button" onClick={this.addNote}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Submit;
