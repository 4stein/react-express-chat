import React from "react";
import { Message } from "../../comoinents/UI";
import styles from "./Home.module.sass";
import avatarSrc from "../../images/avatar1.png";

const Home = () => {
  const user = {
    fullname: "User1"
  }
  return (
    <section className={styles.home}>
      <Message
        avatar={avatarSrc}
        text="Hello"
        date="Fri May 06 2022 21:35:11"
        user={user}
        isMe={false}
      />
    </section>
  );
};

export default Home;
