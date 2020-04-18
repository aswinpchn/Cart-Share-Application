import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/AppEntry/LandingPage";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main>
        <div className="content">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LandingPage} />
            </Switch>
          </BrowserRouter>
        </div>
      </main>
    );
  }
}

export default App;
