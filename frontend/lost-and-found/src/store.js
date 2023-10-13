// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/authReducers'; // Import your authReducer

const initialState = {
  user: null,
  accessToken: null,
  loginError: null,
  signupError: null,
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
