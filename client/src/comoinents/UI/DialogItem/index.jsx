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
  text,
  isMe,
  isReaded,
  created_at,
  unreaded,
}) => {
  // useSelector
  const currentDialogId = useSelector(
    (state) => state.dialogs.currentDialogId
  );
  // useDispatch
  const dispatch = useDispatch();

  return (
    <div
      className={classNames(styles.item, {
        [styles.online]: user.isOnline,
        [styles.actibe]: currentDialogId === _id,
      })}
      onClick={() => dispatch(dialogsActions.setCurrentDialogId(_id))}
    >
      <div className={styles.avatar}>
        <Avatar user={user} />
      </div>
      <div className={styles.info}>
        <div className={styles.top}>
          <p>{user.fullname}</p>
          <span>
            {/* 13:50 */}
            {created_at && <Time date={new Date(created_at)} />}
          </span>
        </div>
        <div className={styles.bottom}>
          <p>{text}</p>

          {isMe ? (
            <MessageStatus isMe={true} isReaded={isReaded} dialogs={true} />
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
