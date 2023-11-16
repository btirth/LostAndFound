import React from "react";
import "../src/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SignupPage from "./Pages/LandingPage/LandingPage"; 
import SigninPage from "./Pages/LandingPage/LoginMainPage"; 
import HomePage from "./Pages/HomePage/HomePage";
import PrivateRoute from "./Components/PrivateRoute"; 
import LostItemForm from "./Pages/LostItemForm/LostItemForm";
import LostCatalogue from "./Components/LostCatalogue";
import Layout from "./Components/Layout";
import ChatPage from './Pages/ChatPage/ChatPage';

const App = () => {
  return (
    <Router>
      <Layout style="position:'fixed';">
        <Switch>
          <Route exact path="/" component={SignupPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={SigninPage} />
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute path="/lost-form" component={LostItemForm} />
          <PrivateRoute path="/lost-catalogue" component={LostCatalogue} />
          <PrivateRoute path="/chat" component={ChatPage} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
