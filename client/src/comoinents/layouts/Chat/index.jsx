import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Chat.module.sass";
import { ChatInput, OnlineStatus, Sidebar, UploadFiles } from "../../UI";
import { Messages } from "../../../containers";
import { Empty } from "antd";

const Chat = () => {
  const [fullname, setFullname] = useState("");
  // useSelector
  const user = useSelector((state) => state.user.user);
  const items = useSelector((state) => state.dialogs.items);
  const currentDialogId = useSelector((state) => state.dialogs.currentDialogId);
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
      <Sidebar />
      {currentDialogId ? (
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
              <div />
            </div>
            <Messages />
          </div>
          <div>
            <div className={styles.dialogTextarea}>
              <ChatInput />
            </div>
            <div>
              <UploadFiles />
            </div>
          </div>
        </div>
      ) : (
        <Empty
          className={styles.nomessagesBox}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Choice dialog"
        />
      )}
    </div>
  );
};

export default Chat;
