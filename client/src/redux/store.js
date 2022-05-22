import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleWere from "redux-thunk";
import rootReducer from "./reducers";
// REDUX_DEVTOOLS
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// store
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleWere))
);
export default store;
