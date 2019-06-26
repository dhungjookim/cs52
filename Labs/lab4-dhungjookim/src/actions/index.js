import axios from 'axios';
// import { useReducer } from 'react';

const ROOT_URL = 'http://localhost:9090/api';
const API_KEY = '';

// const ROOT_URL = 'https://lab5-p1.herokuapp.com/api';
// const API_KEY = '';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  UPDATE_POST: 'UPDATE_POST',
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

export function fetchPosts() {
  console.log('fetching posts');
  // ActionCreator returns a function
  // that gets called with dispatch
  // remember (arg) => { } is a function
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
        console.log('response.data:');
        console.log(response.data);
      });
  };
}


export function fetchPost(id) {
  // console.log(id);
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
      .then((response) => {
        console.log(response.data);
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      });
  };
}

export function createPost(post, history) {
  console.log('hitting createPost actioncreator');
  console.log(post);
  console.log(history);
  return (dispatch) => {
    // console.log(dispatch);
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        console.log(response);
        history.push('/');
      });
  };
}

export function updatePost(post, id) {
  const newPost = {
    title: post.title,
    content: post.content,
    cover_url: post.cover_url,
    tags: post.tags,
    author: post.author,
  };
  console.log(newPost);
  return (dispatch) => {
    // axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, newPost)
    axios.put(`${ROOT_URL}/posts/${id}`, newPost, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
      });
  };
}

export function deletePost(id, history) {
  console.log('deleting');
  return (dispatch) => {
    // axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
      });
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }, history) {
  console.log('signing in user from actions/index.js');
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        dispatch(authError(`Error signing in user: ${error.response.data}`));
      });
  };
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signin endpoint
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
}


export function signupUser({
  username, email, password, first, last,
}, history) {
  console.log({ email, password });
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, {
      username, email, password, first, last,
    })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        console.log(response.data.token);
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        dispatch(authError(`Error signing up user: ${error.response.data}`));
      });
  };
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
}


// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    // console.log('signing out in actions/index.js');
    history.push('/');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}
