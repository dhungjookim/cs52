import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createPost } from '../actions/index';
import uploadImage from '../s3';


const mapStateToProps = (state) => {
  console.log('new post');
  return (
    {
      post: state.posts.current,
    }
  );
};

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      cover_url: '',
      tags: '',
      username: '',
    };
  }

  // onInputChangeCoverURL = (event) => {
  //   this.setState({ cover_url: event.target.value });
  // }

  onInputChangeText = (event) => {
    this.setState({ content: event.target.value });
  }

  onInputChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  onInputChangeTags = (event) => {
    this.setState({ tags: event.target.value });
  }

  // from s3 extra credit assignment
  onImageUpload = (event) => {
    const file = event.target.files[0];
    // Handle null file
    // Get url of the file and set it to the src of preview
    if (file) {
      this.setState({ preview: window.URL.createObjectURL(file), file });
    }
  }

  createPost = (event) => {
    console.log('creating new post: ');
    console.log(this.state.file);
    if (this.state.file) {
      uploadImage(this.state.file).then((url) => {
        console.log('this is the url');
        console.log(url);
        this.setState({ cover_url: url });
        this.props.createPost(this.state, this.props.history);
        // use url for content_url and
        // either run your createPost actionCreator
        // or your updatePost actionCreator
      }).catch((error) => {
        // handle error
        console.log('Error creating post:');
        console.log(error.response.data);
      });
    }
    this.setState({
      title: '',
      content: '',
      cover_url: '',
      tags: '',
    });
  }

  clear = (event) => {
    this.setState({
      title: '',
      content: '',
      cover_url: '',
      tags: '',
    });
  }


  render() {
    return (
      <div className="newPostContainer" id="newPost">
        <Card className="post" width="480px">
          <div className="buttonContainer">
            <Button variant="contained" color="secondary" type="button" onClick={this.clear}>Delete</Button>
            <Button variant="contained" color="primary" type="button" onClick={this.createPost}>Create New Post</Button>
          </div>

          <div className="fileInput">
            <img id="preview" alt="preview" src={this.state.preview} />
          </div>

          <div>
            <TextField id="outlined-name"
              label="Blog Title"
              variant="outlined"
              placeholder="Type Your Title"
              name="title"
              onChange={this.onInputChangeTitle}
              value={this.state.title}
            />
          </div>
          <div>
            <TextField id="outlined-multiline-static"
              multiline
              rows="4"
              variant="outlined"
              margin="normal"
              label="Blog Text Content"
              placeholder="Your blog text here:"
              name="content"
              onChange={this.onInputChangeText}
              value={this.state.content}
            />
          </div>
          <div>
            <input type="file" name="coverImage" onChange={this.onImageUpload} />
            {/* <TextField id="outlined-uncontrolled"
              type="file"
              variant="outlined"
              label="Image URL"
              placeholder="Enter full url here:"
              name="cover_url"
              onChange={this.onImageUpload}
              value={this.state.cover_url}
            /> */}
          </div>
          <div>
            <TextField id="outlined-uncontrolled"
              variant="outlined"
              label="Blog Tag"
              placeholder="Enter #tag"
              name="tags"
              onChange={this.onInputChangeTags}
              value={this.state.tags}
            />
          </div>
          <div className="tags">{ this.props.tags }</div>
        </Card>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { createPost })(NewPost));
