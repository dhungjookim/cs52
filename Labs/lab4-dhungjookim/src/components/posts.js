import React, { Component } from 'react';
import {
  NavLink, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import { fetchPosts } from '../actions/index';
import '../style.scss';


const mapStateToProps = (state) => {
  console.log('state.posts.all:');
  console.log(state.posts.all);
  return (
    {
      posts: state.posts.all,
    }
  );
};

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    console.log('this.props.posts:');
    console.log(this.props.posts);
    return (
      <div className="navContainer">
        { this.props.posts.map(post => (
          <Card className="blogCover" key={post._id}>
            <NavLink className="inactive" activeClassName="active" to={`/posts/${post._id}`}>
              <div className="title">{post.title}</div>
              <img src={post.cover_url} alt="cover" />
              <p className="author">{post.author}</p>
            </NavLink>
          </Card>
        )) }
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
