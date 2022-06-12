import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Messages.module.sass";
import { Empty, Spin } from "antd";
import Message from "../Message";

const Messages = ({
  messagesRef,
  items,
  isLoading,
  user,
  isTyping,
  partner,
}) => {
  return (
    <div ref={messagesRef} className={classNames(styles.messages)}>
      {isLoading ? (
        <div className={styles.nomessages}>
          <Spin tip="Loading..." />
        </div>
      ) : items && items.length ? (
        items.map((item) => (
          <Message key={item._id} {...item} isMe={user._id === item.user._id} />
        ))
      ) : (
        <Empty
          className={styles.nomessages}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No messages"
        />
      )}
      {isTyping.isTyping &&
        isTyping.userId !== "" &&
        user._id !== isTyping.userId && (
          <Message user={partner} isTyping={isTyping} />
        )}
    </div>
  );
};

export default Messages;
