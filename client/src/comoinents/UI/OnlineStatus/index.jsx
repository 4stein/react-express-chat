import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./OnlineStatus.module.sass";

const OnlineStatus = ({ online }) => (
  <div className={classNames(styles.status, { [styles.online]: online })}>
    {online ? "Online" : "Ofline"}
  </div>
);

OnlineStatus.propTypes = {
  online: PropTypes.bool,
};

export default OnlineStatus;
