import React from "react";
import PropTypes from "prop-types";
import styles from "./MessageStatus.module.sass";
import readSrc from "../../../images/read.png";
import readedSrc from "../../../images/readed.png";

const MessageStatus = ({ isMe, isReaded }) => {
  return (
    <>
      {isMe && isReaded ? (
        <img className={styles.checked} src={readedSrc} alt="read status" />
      ) : isMe && isReaded === undefined || isReaded === false ? (
        <img className={styles.checked} src={readSrc} alt="read status" />
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
