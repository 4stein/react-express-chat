import React from "react";
import classNames from "classnames";
import styles from "./DialogItem.module.sass";

import Time from "../Time";
import MessageStatus from "../MessageStatus";
import Avatar from "../Avatar";

// const getAvatar = (user) => {
//   console.log(generateAvararFromHash("d95b"))
//   if (user.avatar) {
//     return <img src={user.avatar} alt={`${user.fullname} avatar`} />;
//   } else {
//     return <img src="" alt={`${user.fullname} avatar`} />;
//     // make avatar
//   }
// };

const DialogItem = ({ user, text, isMe, isReaded, created_at, unreaded }) => (
  <div className={classNames(styles.item, { [styles.online]: user.isOnline })}>
    <div className={styles.avatar}>
      <Avatar user={user} />
    </div>
    <div className={styles.info}>
      <div className={styles.top}>
        <p>{user.fullname}</p>
        <span>
          {/* 13:50 */}
          <Time date={created_at} />
        </span>
      </div>
      <div className={styles.bottom}>
        <p>{text}</p>

        {isMe ? (
          <MessageStatus isMe={true} isReaded={isReaded} />
        ) : (
          unreaded > 0 && (
            <div className={styles.count}>{unreaded > 9 ? "+9" : unreaded}</div>
          )
        )}
      </div>
    </div>
  </div>
);

export default DialogItem;
