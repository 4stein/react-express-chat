import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { Auth, Home } from "./pages";

const App = () => {
  // useSelector
  const isAuth = useSelector((state) => state.user.isAuth);
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path={["/", "/login", "/registration", "/registration/verify", "/dialog/:id"]}>
          {isAuth ? <Home /> : <Auth />}
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
};

export default App;
