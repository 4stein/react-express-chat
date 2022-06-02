import React from "react";
import classNames from "classnames";
import styles from "./Dialogs.module.sass";
import DialogItem from "../DialogItem";
import orderBy from "lodash/orderBy";
import { Empty } from "antd";

const Dialogs = ({ items, userId }) => {
  
  return (
    <div className={classNames(styles.dialogs)}>
      {items && items.length ? (
        orderBy(items, ["created_at"], ["desc"]).map((item) => (
          <DialogItem
            key={item._id}
            user={item.lastMessage.user}
            isMe={item.lastMessage.user?._id === userId}
            {...item}
          />
        ))
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No dialogues"
        />
      )}
    </div>
  );
};

export default Dialogs;
