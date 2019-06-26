import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { signoutUser } from '../actions/index';

const mapStateToProps = (state) => {
//   console.log(state.posts.current);
  return (
    {
      authenticated: state.auth.authenticated,
    }
  );
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   authenticated: this.props.authenticated,
    };
    this.SignOut = this.SignOut.bind(this);
  }

  SignOut(event) {
    console.log('hitting sign out function');
    this.props.signoutUser(this.props.history);
  }

  render() {
    console.log('this is the status of authentication:');
    console.log(this.props.authenticated);
    if (this.props.authenticated) {
      return (
        <nav>
          <ul>
            <li><NavLink to="/" exact>Posts</NavLink></li>
            <li><NavLink to="/posts/new">New Post</NavLink></li>
            <li><button type="button" className=".myButton" onClick={this.SignOut}>Sign Out</button></li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav>
          <ul>
            <li><NavLink to="/" exact>Posts</NavLink></li>
            <li><NavLink to="/posts/new">New Post</NavLink></li>
            <li><NavLink to="/signin">Sign In</NavLink></li>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
          </ul>
        </nav>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, { signoutUser })(NavBar));
