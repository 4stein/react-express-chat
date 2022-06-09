import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
  readed,
  partner,
  autor,
  lastMessage,
}) => {
  // useSelector
  const currentDialogId = useSelector((state) => state.dialogs.currentDialogId);
  const userId = useSelector((state) => state.user.user._id);
  // useDispatch
  const dispatch = useDispatch();
  // useHistory
  let history = useHistory();

  return (
    <div
      className={classNames(styles.item, {
        [styles.online]:
          autor._id === userId ? partner?.isOnline : autor.isOnline,
        [styles.actibe]: currentDialogId === _id,
      })}
      onClick={() => {
        dispatch(dialogsActions.setCurrentDialogId(_id));
        history.push(`/${_id}`);
      }}
    >
      <div className={styles.avatar}>
        <Avatar user={autor._id === userId ? partner : autor} />
      </div>
      <div className={styles.info}>
        <div className={styles.top}>
          <p>{autor._id === userId ? partner?.fullname : autor?.fullname}</p>
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
              isReaded={lastMessage.readed}
              dialogs={true}
            />
          ) : (
            !lastMessage.readed && (
              <div className={styles.count}>
                +1
              </div>
            )
            // lastMessage.readed > 0 && (
            //   <div className={styles.count}>
            //     {lastMessage.readed > 9 ? "+9" : lastMessage.readed}
            //   </div>
            // )
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogItem;
