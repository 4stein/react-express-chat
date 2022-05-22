import React from "react";
import { Route } from "react-router-dom";
import styles from "./Auth.module.sass";
import { LoginForm, RegistrationForm } from "../../modules";

const Auth = () => {
  return (
    <section className={styles.auth}>
      <div>
        <Route exact path={["/", "/login"]}>
          <LoginForm />
        </Route>
        <Route path="/registration">
          <RegistrationForm />
        </Route>
      </div>
    </section>
  );
};

export default Auth;
