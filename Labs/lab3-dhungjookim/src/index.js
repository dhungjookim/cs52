// V1 http://lab3-dhungjookim-v1.surge.sh/
// V2 http://lab3-dhungjookim-v2.surge.sh/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Map } from 'immutable';
import Note from './components/note';
import Submit from './components/submit';
import * as db from './services/datastore';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      notes: new Map({
        0: {
          title: 'Default Title',
          text: 'default text',
          x: 200,
          y: 200,
          zIndex: 20,
        },
      }),
    };
  }

  // db functions
  updateNote = (id, editingText, editingTitle, state, x, y) => {
    db.updateNote(id, editingText, editingTitle, state, x, y);
  }

  componentDidMount = () => {
    db.fetchNotes((notes) => {
      this.setState({ notes: new Map(notes) });
    });
  }

  deleteNote = (id) => {
    db.deleteNote(id);
  }

  // render
  render() {
    return (
      <div>
        <div>
          <div>React enabled post-it note app</div>
          <Submit addNote={this.addNote} />
        </div>
        <div>
          { this.state.notes.entrySeq().map(([id, note]) => (
            <Note updateNote={this.updateNote} deleteNote={this.deleteNote} title={note.title} text={note.text} x={note.x} y={note.y} zIndex={note.zIndex} key={id} id={id} />
          )) }
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
