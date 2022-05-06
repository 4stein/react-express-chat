import React from "react";
import styles from "./Message.module.sass";
import PropTypes from "prop-types";
import formatDistance from "date-fns/formatDistance";
// import classNames from "classnames";

const Message = ({ avatar, user, text, date }) => {
  // timeNow
  const timeNow = formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  });
  return (
    <div className={styles.message}>
      <div className={styles.avatar}>
        <img src={avatar} alt={`Avatar ${user.fullname}`} />
      </div>
      <div className={styles.textbox}>
        <div className={styles.bubble}>
          <p className={styles.text}>{text}</p>
        </div>
        <span className={styles.date}>{timeNow}</span>
      </div>
    </div>
  );
};

Message.defoultTypes = {
  user: { fullname: "User" },
};

Message.propTypes = {
  avatar: PropTypes.string,
  user: PropTypes.object,
  text: PropTypes.string,
  date: PropTypes.string,
};

export default Message;
