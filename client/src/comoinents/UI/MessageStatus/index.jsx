import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./MessageStatus.module.sass";
import readSrc from "../../../images/read.png";
import readedSrc from "../../../images/readed.png";

const MessageStatus = ({ isMe, isReaded, dialogs }) => {
  return (
    <>
      {isMe && isReaded ? (
        <img
          className={classNames(styles.checked, { [styles.isme]: isMe, [styles.dialogs]: dialogs })}
          src={readedSrc}
          alt="read status"
        />
      ) : (isMe && isReaded === undefined) || isReaded === false ? (
        <img
          className={classNames(styles.checked, { [styles.isme]: isMe })}
          src={readSrc}
          alt="read status"
        />
      ) : (
        ""
      )}
    </>
  );
};

MessageStatus.propTypes = {
  isMe: PropTypes.bool,
  isReaded: PropTypes.bool,
};

export default MessageStatus;
