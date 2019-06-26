import React, { Component } from 'react';
// import Draggable from 'react-draggable';
import marked from 'marked';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { fetchPost, deletePost, updatePost } from '../actions/index';
import uploadImage from '../s3';

const mapStateToProps = (state) => {
  return {
    post: state.posts.current,
  };
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      cover_url: '',
      tags: '',
      author: '',
      isEditing: false,
    };
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
    console.log(this.props.match.params.id);
    // receiving correct id
  }

  onInputChangeCoverURL = (event) => {
    this.setState({ cover_url: event.target.value });
  }

  onInputChangeText = (event) => {
    this.setState({ content: event.target.value });
  }

  onInputChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  onInputChangeTags = (event) => {
    this.setState({ tags: event.target.value });
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    // Handle null file
    // Get url of the file and set it to the src of preview
    if (file) {
      this.setState({ preview: window.URL.createObjectURL(file), file });
    }
  }

  updatePost = (event) => {
    console.log(this.state);
    if (this.state.file) {
      uploadImage(this.state.file).then((url) => {
        this.setState({ cover_url: url });
        this.props.updatePost(this.state, this.props.match.params.id);
        // use url for content_url and
        // either run your createPost actionCreator
        // or your updatePost actionCreator
      }).catch((error) => {
        // handle error
        console.log(error);
      });
    }
    this.setState({ isEditing: false });
  }

  deletePost = (event) => {
    this.props.deletePost(this.props.post._id, this.props.history);
  }

  isEditingTrue = () => {
    this.setState({ isEditing: true });
  }

  // from billy mcgrath
  renderUser() {
    console.log(this.props.post.author);
    if (this.props.post.author !== undefined) {
      return (<p className="blog-content">by {this.props.post.author}</p>);
    } else {
      return (<p className="blog-content">by Anonymous</p>);
    }
  }

  renderPost() {
    // console.log(this.props.post);
    // console.log(this.props.post.title);
    console.log('rendering post');

    if (this.state.isEditing) {
      return (
        <Card>
          <div className="fileInput">
            <img id="preview" alt="preview" src={this.state.preview} />
          </div>
          <div className="buttonContainer">
            <Button variant="contained" color="secondary" type="button" onClick={this.deletePost}>Delete</Button>
            <Button variant="contained" color="primary" type="button" onClick={this.updatePost}>Submit Edits</Button>
          </div>
          <div>
            <TextField id="outlined-name"
              variant="outlined"
              placeholder={this.props.post.title}
              name="title"
              onChange={this.onInputChangeTitle}
              value={this.state.title}
            />
          </div>
          <div>
            <TextField id="outlined-multiline-static"
              multiline
              rows="4"
              margin="normal"
              variant="outlined"
              placeholder={this.props.post.content}
              name="text"
              onChange={this.onInputChangeText}
              value={this.state.content}
            />
          </div>
          <div>
            <input type="file" name="coverImage" onChange={this.onImageUpload} />
            {/* <TextField id="outlined-uncontrolled"
              variant="outlined"
              placeholder={this.props.post.cover_url}
              name="coverURL"
              onChange={this.onInputChangeCoverURL}
              value={this.state.cover_url}
            /> */}
          </div>
          <div>
            <TextField id="outlined-uncontrolled"
              variant="outlined"
              placeholder={this.props.post.tags}
              name="tags"
              onChange={this.onInputChangeTags}
              value={this.state.tags}
            />
          </div>
        </Card>
      );
    } else {
      return (
        <Card>
          <div className="fileInput">
            <img id="preview" alt="preview" src={this.state.preview} />
            <input type="file" name="coverImage" onChange={this.onImageUpload} />
          </div>
          <div className="buttonContainer">
            <Button variant="contained" color="secondary" type="button" onClick={this.deletePost}>Delete</Button>
            <Button variant="contained" color="secondary" type="button" onClick={this.isEditingTrue}>Edit</Button>
          </div>
          <h1 className="title">{this.props.post.title}</h1>
          <div className="text" dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }} />
          <img src={this.props.post.cover_url} alt="cover" />
          <div className="tags">{ this.props.post.tags }</div>
          {this.renderUser()}
        </Card>
      );
    }
  }

  render() {
    return (
      <div className="postContainer">
        {this.renderPost()}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { fetchPost, updatePost, deletePost })(Post));
