import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return Object.assign({}, state, {
        all: action.payload,
      });
    case ActionTypes.FETCH_POST:
      return Object.assign({}, state, {
        current: action.payload,
      });
    case ActionTypes.UPDATE_POST:
      return Object.assign({}, state, {
        current: action.payload,
      });
    default:
      return state;
  }
};

export default postsReducer;
