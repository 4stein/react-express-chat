import React from "react";
import { Dialogs, Message } from "../../comoinents/UI";
import styles from "./Home.module.sass";
// import audio from "../../audio/air-gear-ost.mp3"

import avatarSrc from "../../images/avatar1.png";
const items = [
  {
    _id: Math.random(),
    text: "Some text from message, Some text from message",
    isReaded: true,
    created_at: new Date("Fri May 06 2022 21:35:11"),
    unreaded: 44,
    user: {
      _id: "pp4d",
      fullname: "Mr Doruchenko",
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
      _id: "f4c1",
      fullname: "Username",
      avatar: null,
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
      _id: "a94k",
      fullname: "Kakah",
      avatar: null,
      isOnline: true,
    },
  },
];

const Home = () => {
  const userId = "pp4d";
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
        date={new Date("Fri May 06 2022 21:35:11")}
        user={user}
        // audio={audio}
        // isMe={true}
        // isTyping={true}
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
