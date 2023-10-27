import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; // Import Provider
import store from './store'; // Import your Redux store
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <Provider store={store}>
  <App />
  <ToastContainer />

  </Provider>,
document.getElementById("root")
);
