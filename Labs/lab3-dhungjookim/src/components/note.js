import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {

      editingText: this.props.text,
      editingTitle: this.props.title,
      isEditing: false,
      position: {
        x: props.x, y: props.y,
      },
    };
    this.onInputChangeText = this.onInputChangeText.bind(this);
    this.onInputChangeTitle = this.onInputChangeTitle.bind(this);
  }

  onInputChangeText = (event) => {
    this.setState({ editingText: event.target.value });
  }

  onInputChangeTitle = (event) => {
    this.setState({ editingTitle: event.target.value });
  }


  handleDrag = (e, ui) => {
    const { x, y } = this.state.position;
    this.setState({
      position: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
    this.props.updateNote(this.props.id, this.state.editingText, this.state.editingTitle,
      this.state, this.state.position.x, this.state.position.y);
  }

  onDelete = () => {
    this.props.deleteNote(this.props.id);
  }

  isEditingFalse = () => {
    this.setState({ isEditing: false });
    this.props.updateNote(this.props.id, this.state.editingText, this.state.editingTitle,
      this.state, this.state.position.x, this.state.position.y);
    console.log(this.state.editingText);
  }

  isEditingTrue = () => {
    this.setState({ isEditing: true });
  }

  renderNoteSection() {
    if (this.state.isEditing) {
      return (
        <Draggable
          disabled
          handle=".note"
          grid={[25, 25]}
          position={{
            x: this.state.position.x, y: this.state.position.y, width: 200, height: 200,
          }}
          onDrag={this.handleDrag}
        >
          <div>
            <div className="note">
              <button type="button" onClick={this.onDelete}>Delete</button>
              <button type="button" onClick={this.isEditingFalse}>Submit Edits</button>
              <div>
                <input name="title" onChange={this.onInputChangeTitle} value={this.state.editingTitle} />
              </div>
              <div>
                <input name="text" onChange={this.onInputChangeText} value={this.state.editingText} />
              </div>
              <div className="zIndex">{ this.props.zIndex }</div>
            </div>
          </div>
        </Draggable>
      );
    } else {
      return (
        <Draggable
          handle=".note"
          grid={[25, 25]}
          position={{
            x: this.props.x, y: this.props.y, width: 200, height: 200,
          }}
          onDrag={this.handleDrag}
        >
          <div>
            <div className="note">
              <button type="button" onClick={this.onDelete}>Delete</button>
              <button type="button" onClick={this.isEditingTrue}>Edit</button>
              <div className="title">{ this.props.title }</div>
              <div className="text" dangerouslySetInnerHTML={{ __html: marked(this.props.text || '') }} />
              <div className="zIndex">{ this.props.zIndex }</div>
            </div>
          </div>
        </Draggable>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderNoteSection()}
      </div>
    );
  }
}

export default Note;
