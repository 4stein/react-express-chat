import React from "react";
import { Chat } from "../../comoinents/layouts";
import styles from "./Home.module.sass";


const Home = () => {
  return (
    <section className={styles.home}>
      <Chat/>
    </section>
  );
};

export default Home;
