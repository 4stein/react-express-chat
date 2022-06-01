import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "antd";
import {
  TeamOutlined,
  FormOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import styles from "./Chat.module.sass";
import { ChatInput, OnlineStatus } from "../../UI";
import { Dialogs, Messages } from "../../../containers";



const Chat = () => {
  // useState
  const [searchValue, setSearchValue] = useState("");
  const { Search } = Input;

  const userId = useSelector((state) => state.user.user._id);

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
            onSearch={(value) => setSearchValue(value)}
          />
        </div>
        <div className={styles.sidebarDialogs}>
          <Dialogs userId={userId} searchValue={searchValue} />
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
          <Messages />
        </div>
        <div className={styles.dialogTextarea}>
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default Chat;
