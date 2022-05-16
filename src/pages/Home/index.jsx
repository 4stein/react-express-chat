import React from "react";
import { Dialogs, Message } from "../../comoinents/UI";
import styles from "./Home.module.sass";
import audio from "../../audio/air-gear-ost.mp3"

import avatarSrc from "../../images/avatar1.png";

const items = [
  {
    _id: Math.random(),
    text: "Some text from message, Some text from message",
    isReaded: false,
    created_at: new Date("Fri May 06 2022 21:35:11"),
    unreaded: 44,
    user: {
      _id: 0,
      fullname: "Username",
      avatar: avatarSrc,
      isOnline: true,
    },
  },
  {
    _id: Math.random(),
    text: "Some text from message, Some text from message",
    isReaded: false,
    created_at: new Date(),
    unreaded: 44,
    user: {
      _id: 3,
      fullname: "Username",
      avatar: avatarSrc,
      isOnline: true,
    },
  },
  {
    _id: Math.random(),
    text: "Some text from message, Some text from message",
    isReaded: false,
    created_at: new Date(),
    unreaded: 44,
    user: {
      _id: 1,
      fullname: "Username",
      avatar: avatarSrc,
      isOnline: true,
    },
  },
];

const Home = () => {
  const userId = 0;
  const user = {
    fullname: 'User1',
    avatar: avatarSrc
  }
  return (
    <section className={styles.home}>
      <Dialogs items={items} userId={userId} />
      <br />
      <br />
      <br />
       <Message
        avatar={avatarSrc}
        text="Hello"
        date={new Date("Fri May 06 2022 21:35:11")}
        audio={audio}
        user={user}
        // attachments={[
        //   {
        //     filename: "img.png",
        //     url: "https://source.unsplash.com/random/100x100/?nature",
        //   },
        //   {
        //     filename: "img.png",
        //     url: "https://source.unsplash.com/random/100x100/?nature",
        //   },
        // ]}
      />
     
    </section>
  );
};

export default Home;
