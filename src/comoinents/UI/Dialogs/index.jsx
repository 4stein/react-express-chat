import React from "react";
import classNames from "classnames";
import styles from "./Dialogs.module.sass";
import DialogItem from "../DialogItem";
import orderBy from "lodash/orderBy";

const Dialogs = ({ items, userId }) => (
  <div className={classNames(styles.dialogs)}>
    {orderBy(items, ["created_at"], ["desc"]).map((item) => (
      <DialogItem
        key={item._id}
        user={item.user}
        isMe={item.user._id === userId}
        {...item}
      />
    ))}
  </div>
);

export default Dialogs;
