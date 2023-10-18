import React from 'react';
import '../src/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignupPage from './Pages/LandingPage/LandingPage'; // Import your SignupPage component
import SigninPage from './Pages/LandingPage/LoginMainPage'; // Import your SigninPage component
import HomePage from './Pages/HomePage/HomePage';
import PrivateRoute from './Components/PrivateRoute'; // Import the PrivateRoute component
import LostItemForm from './Pages/LostItemForm/LostItemForm';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignupPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={SigninPage} />
        <PrivateRoute path="/home" component={HomePage} /> {/* Protect the home route */}
        <PrivateRoute path="/lost-form" component={LostItemForm} /> {/* Protect the home route */}
        {/* Add other routes for different pages as needed */}
      </Switch>
    </Router>
  );
};

export default App;