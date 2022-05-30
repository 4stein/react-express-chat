import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import styles from "./DialogItem.module.sass";
import Time from "../Time";
import MessageStatus from "../MessageStatus";
import Avatar from "../Avatar";
import { dialogsActions } from "../../../redux/actions";

const DialogItem = ({
  _id,
  user,
  isMe,
  isReaded,
  created_at,
  unreaded,
  lastMessage,
}) => {
  // useSelector
  const currentDialogId = useSelector((state) => state.dialogs.currentDialogId);
  // useDispatch
  const dispatch = useDispatch();

  return (
    <div
      className={classNames(styles.item, {
        [styles.online]: lastMessage.user?.isOnline,
        [styles.actibe]: currentDialogId === _id,
      })}
      onClick={() => dispatch(dialogsActions.setCurrentDialogId(_id))}
    >
      <div className={styles.avatar}>
        <Avatar user={lastMessage.user} />
      </div>
      <div className={styles.info}>
        <div className={styles.top}>
          <p>{lastMessage.user?.fullname}</p>
          <span>
            {/* 13:50 */}
            {lastMessage.createdAt && (
              <Time date={new Date(lastMessage.createdAt)} />
            )}
          </span>
        </div>
        <div className={styles.bottom}>
          <p>{lastMessage.text}</p>

          {isMe ? (
            <MessageStatus
              isMe={true}
              isReaded={lastMessage.unread}
              dialogs={true}
            />
          ) : (
            unreaded > 0 && (
              <div className={styles.count}>
                {unreaded > 9 ? "+9" : unreaded}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogItem;
