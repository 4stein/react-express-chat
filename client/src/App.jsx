import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { Auth, Home } from "./pages";
import { userActions } from "./redux/actions";

const App = () => {
  // useSelector
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(userActions.fetchUserData());
  }, [isAuth]);
  return (
    <div className="wrapper">
      <Switch>
        <Route
          exact
          path={["/", "/login", "/registration", "/registration/verify"]}
        >
          {isAuth ? <Home /> : <Auth />}
        </Route>
        <Route path={["/in", "/:id"]}>
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
