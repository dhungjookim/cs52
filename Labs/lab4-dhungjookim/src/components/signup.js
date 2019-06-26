import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { signupUser } from '../actions/index';

// const mapStateToProps = (state) => {
//   console.log(state.auth.user);
//   return (
//     {
//       user: state.auth.user,
//     }
//   );
// };

class SignUpUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      name: {
        first: '',
        last: '',
      },
    };
  }


  onInputChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  onInputChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  onInputChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  onInputChangeFirst = (event) => {
    this.setState({ first: event.target.value });
  }

  onInputChangeLast = (event) => {
    this.setState({ last: event.target.value });
  }


  signUp = (event) => {
    this.props.signupUser(this.state, this.props.history);
  }

  clear = (event) => {
    this.setState({
      email: '',
      password: '',
    });
  }


  render() {
    return (
      <div className="newPostContainer" id="newPost">
        <Card className="post" width="480px">
          <div className="buttonContainer">
            <Button variant="contained" color="secondary" type="button" onClick={this.clear}>Cancel</Button>
            <Button variant="contained" color="primary" type="button" onClick={this.signUp}>Sign Up</Button>
          </div>
          <div>
            <TextField id="outlined-name"
              label="First Name"
              variant="outlined"
              placeholder="Enter your first name:"
              name="first"
              onChange={this.onInputChangeFirst}
              value={this.state.first}
            />
          </div>
          <div>
            <TextField id="outlined-name"
              label="Last Name"
              variant="outlined"
              placeholder="Enter your last name:"
              name="last"
              onChange={this.onInputChangeLast}
              value={this.state.last}
            />
          </div>
          <div>
            <TextField id="outlined-name"
              label="Username"
              variant="outlined"
              placeholder="Create a username:"
              name="username"
              onChange={this.onInputChangeUsername}
              value={this.state.username}
            />
          </div>
          <div>
            <TextField id="outlined-name"
              label="Email"
              variant="outlined"
              placeholder="Enter your email:"
              name="email"
              onChange={this.onInputChangeEmail}
              value={this.state.email}
            />
          </div>
          <div>
            <TextField id="outlined-uncontrolled"
              variant="outlined"
              label="Password"
              placeholder="Enter your password:"
              name="password"
              onChange={this.onInputChangePassword}
              value={this.state.password}
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser })(SignUpUser));
