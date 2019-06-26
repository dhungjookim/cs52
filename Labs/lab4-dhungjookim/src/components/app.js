import React from 'react';
// import ReactDOM from 'react-dom';
import '../style.scss';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
// import $ from 'jquery';
// import { withStyles } from '@material-ui/core/styles';
import Posts from './posts';
import NewPost from './newpost';
import Post from './post';
import SignIn from './signin';
import SignUp from './signup';
import Nav from './navbar';
import RequireAuth from '../containers/requireAuth';


const Fallback = (props) => {
  return <div>URL Not Found</div>;
};

const App = (props) => {
  return (
    <Router>
      <div className="navBar">
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          {/* eslint-disable-next-line new-cap */}
          <Route path="/posts/new" component={RequireAuth(NewPost)} />
          <Route path="/posts/:id" component={Post} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route component={Fallback} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

// ReactDOM.render(<App />, document.getElementById('main'));
