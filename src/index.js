import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/index.sass";
import App from "./App";

// ReactDOM
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// hot
if (module.hot) {
  module.hot.accept();
}
