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
  const [fullname, setFullname] = useState("");
  // useSelector
  const user = useSelector((state) => state.user.user);
  const items = useSelector((state) => state.dialogs.items);
  const currentDialogId = useSelector((state) => state.dialogs.currentDialogId);
  const userId = useSelector((state) => state.user.user._id);
  // useEffect
  useEffect(() => {
    if (
      currentDialogObj &&
      currentDialogObj.autor !== undefined &&
      currentDialogObj.partner !== undefined
    ) {
      if (currentDialogObj.autor._id === user._id) {
        setFullname(currentDialogObj.partner.fullname);
      } else {
        setFullname(currentDialogObj.autor.fullname);
      }
    }
  }, [user, items, currentDialogId]);
  // consts
  const currentDialogObj = items.filter(
    (dialog) => dialog._id === currentDialogId
  )[0];

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
              <div className={styles.dialogHeaderName}>{fullname}</div>
              <div className={styles.dialogHeaderStatus}>
                <OnlineStatus
                  user={user}
                  items={items}
                  currentDialogId={currentDialogId}
                />
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
