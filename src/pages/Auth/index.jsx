import React from "react";
import { UIButton, WhiteBlock } from "../../comoinents/UI";
import styles from "./Auth.module.sass";
const Auth = () => {
  return (
    <section className={styles.auth}>
      <div>
        <div className={styles.top}>
          <h2>Log In</h2>
          <p>Please log in your account</p>
        </div>
        <WhiteBlock className={styles.block}>
          <UIButton type="primary" size="large">
            Test Button
          </UIButton>
        </WhiteBlock>
      </div>
    </section>
  );
};

export default Auth;
