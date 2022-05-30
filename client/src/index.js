import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import "./styles/index.sass";
import App from "./App";

import { Provider } from "react-redux";
import store from "./redux/store";
import history from "./utils/history";


// ReactDOM
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// hot
if (module.hot) {
  module.hot.accept();
}
