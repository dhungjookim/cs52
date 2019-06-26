import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { signinUser } from '../actions/index';

// const mapStateToProps = (state) => {
//   console.log('this is state.users.current:');
//   console.log(state);
//   return (
//     {
//       user: state.auth.user,
//     }
//   );
// };

class SignInUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }


  onInputChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  onInputChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }


  signinUser = (event) => {
    this.props.signinUser(this.state, this.props.history);
    // this.setState({
    //   email: '',
    //   password: '',
    // });
  }

  clear = (event) => {
    this.setState({
      email: '',
      password: '',
    });
  }


  render() {
    console.log('creating SignInUser');

    return (
      <div className="newPostContainer" id="newPost">
        <Card className="post" width="480px">
          <div className="buttonContainer">
            <Button variant="contained" color="secondary" type="button" onClick={this.clear}>Cancel</Button>
            <Button variant="contained" color="primary" type="button" onClick={this.signinUser}>Sign In</Button>
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

export default withRouter(connect(null, { signinUser })(SignInUser));
