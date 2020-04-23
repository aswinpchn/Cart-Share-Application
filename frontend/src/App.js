import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/AppEntry/LandingPage";
import Main from "./components/Main/Main";
import UserDetailsForm from "./components/AppEntry/UserDetailsForm";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./App.css";
import firebase from 'firebase';
import Test from "./components/AppEntry/Test";


firebase.initializeApp({
    apiKey: 'AIzaSyAsxkjbgvkJeKFIN2jMVszfhdyaWB7am7g',
    authDomain: 'cart-share-2712d.firebaseapp.com'
  })

class App extends Component {
  render() {
    return (
      <main>
        <div className="content">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route
                exact
                path="/UserDetailsForm"
                component={UserDetailsForm}
              />
              <Route path="/main" component={Main} />
              <Route exact path="/Test" component={Test} />
            </Switch>
          </BrowserRouter>
        </div>
      </main>
    );
  }
}

export default App;
