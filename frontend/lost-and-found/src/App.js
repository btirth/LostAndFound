import React from 'react';
import '../src/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignupPage from './Pages/LandingPage/LandingPage'; 
import SigninPage from './Pages/LandingPage/LoginMainPage'; 
import HomePage from './Pages/HomePage/HomePage';
import PrivateRoute from './Components/PrivateRoute'; 
import LostItemForm from './Pages/LostItemForm/LostItemForm';
import LostCataloguePage from './Pages/LostCataloguePage/LostCataloguePage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignupPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={SigninPage} />
        <PrivateRoute path="/home" component={HomePage} /> {/* Protect the home route */}
        <PrivateRoute path="/lost-form" component={LostItemForm} /> {/* Protect the home route */}
        <PrivateRoute path="/lost-catalogue" component={LostCataloguePage} /> {/* Protect the catalogue route */}
        {/* Add other routes for different pages as needed */}
      </Switch>
    </Router>
  );
};

export default App;
