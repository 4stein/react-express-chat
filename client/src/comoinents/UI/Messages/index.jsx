import React from "react";
import classNames from "classnames";
import styles from "./Messages.module.sass";
import { Empty, Spin } from "antd";
import Message from "../Message";

const Messages = ({ messagesRef, items, isLoading }) => (
  <div ref={messagesRef} className={classNames(styles.messages)}>
    {isLoading ? (
      <div className={styles.nomessages}>
        <Spin tip="Loading..." />
      </div>
    ) : items && items.length ? (
      items.map((item) => <Message key={item._id} {...item} />)
    ) : (
      <Empty
        className={styles.nomessages}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="No messages"
      />
    )}
  </div>
);

export default Messages;
