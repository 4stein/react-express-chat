import React from "react";
import styles from "./Button.module.sass";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button } from "antd";

const UIButton = (props) => (
  <Button
    {...props}
    className={classNames(
      styles.button,
      props.className,
      props.size === "large" ? styles.buttonlarge : ""
    )}
  />
);

UIButton.defoultTypes = {
  className: PropTypes.string,
};

export default UIButton;
