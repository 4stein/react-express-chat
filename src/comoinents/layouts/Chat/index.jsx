import React from "react";
import { Input } from "antd";
import {
  TeamOutlined,
  FormOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import styles from "./Chat.module.sass";
import { ChatInput, Dialogs, Message, OnlineStatus } from "../../UI";
import audio from "../../../audio/air-gear-ost.mp3";
import avatarSrc from "../../../images/avatar1.png";

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

const Chat = () => {
  const userId = "pp4d";
  const user = {
    fullname: "User1",
    avatar: avatarSrc,
  };
  const { Search } = Input;
  return (
    <div className={styles.chat}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div>
            <TeamOutlined /> <p>List of dialogues</p>
          </div>
          <div>
            <FormOutlined style={{ cursor: "pointer" }} />
          </div>
        </div>
        <div className={styles.sidebarSearch}>
          <Search
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
          />
        </div>
        <div className={styles.sidebarDialogs}>
          <Dialogs items={items} userId={userId} />
        </div>
      </div>
      <div className={styles.dialog}>
        <div>
          <div className={styles.dialogHeader}>
            <div />
            <div className={styles.dialogHeaderCenter}>
              <div className={styles.dialogHeaderName}>Mr Doruchenko</div>
              <div className={styles.dialogHeaderStatus}>
                <OnlineStatus online={true} />
              </div>
            </div>
            <EllipsisOutlined style={{ fontSize: "22px", cursor: "pointer" }} />
          </div>
          <div className={styles.dialogMessages}>
            <Message
              avatar={avatarSrc}
              date={new Date("Fri May 06 2022 21:35:11")}
              user={user}
              text="Hello"
            />
            <Message
              avatar={avatarSrc}
              date={new Date("Fri May 06 2022 21:35:11")}
              user={user}
              text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, temporibus."
            />
            <Message
              avatar={avatarSrc}
              date={new Date("Fri May 06 2022 21:35:11")}
              user={user}
              text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, temporibus."
              attachments={[
                {
                  filename: "img.png",
                  url: "https://source.unsplash.com/random/100x100/?nature",
                },
                {
                  filename: "img.png",
                  url: "https://source.unsplash.com/random/100x100/?nature",
                },
              ]}
            />
            <Message
              avatar={avatarSrc}
              date={new Date("Fri May 06 2022 21:35:11")}
              user={user}
              audio={audio}
            />
            <Message
              avatar={avatarSrc}
              date={new Date("Fri May 06 2022 21:35:11")}
              user={user}
              attachments={[
                {
                  filename: "img.png",
                  url: "https://source.unsplash.com/random/100x100/?nature",
                },
              ]}
            />
            <Message
              avatar={avatarSrc}
              date={new Date("Fri May 06 2022 21:35:11")}
              user={user}
              text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, temporibus."
              isMe={true}
              isReaded={true}
            />
            <Message
              avatar={avatarSrc}
              date={new Date("Fri May 06 2022 21:35:11")}
              user={user}
              isTyping={true}
            />
          </div>
        </div>
        <div className={styles.dialogTextarea}>
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default Chat;
