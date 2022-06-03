import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./OnlineStatus.module.sass";

const OnlineStatus = ({ user, items, currentDialogId }) => {
  const [online, setOnline] = useState(false);

  const currentDialogObj = items.filter(
    (dialog) => dialog._id === currentDialogId
  )[0];

  useEffect(() => {
    if (
      currentDialogObj &&
      currentDialogObj.autor !== undefined &&
      currentDialogObj.partner !== undefined
    ) {
      if (currentDialogObj.autor._id === user._id) {
        setOnline(currentDialogObj.partner.isOnline);
      } else {
        setOnline(currentDialogObj.autor.isOnline);
      }
    }
  }, [user, items, currentDialogId]);

  console.log(user)
  console.log(items)
  console.log(currentDialogId)

  return (
    <div className={classNames(styles.status, { [styles.online]: online })}>
      {online ? "Online" : "Ofline"}
    </div>
  );
};

OnlineStatus.propTypes = {
  online: PropTypes.bool,
};

export default OnlineStatus;
