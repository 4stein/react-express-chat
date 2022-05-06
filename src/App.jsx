import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Auth, Home } from "./pages";

export class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Switch>
          <Route exact path={["/", "/login", "/registration"]}>
            <Auth />
          </Route>
          <Route path="/in">
            <Home />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
