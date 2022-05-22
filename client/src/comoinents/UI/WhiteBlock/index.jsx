import React from "react";
import classNames from "classnames";
import styles from "./WhiteBlock.module.sass";

const WhiteBlock = ({ children, className }) => (
  <div className={classNames(styles.block, className)}>{children}</div>
);
export default WhiteBlock;
