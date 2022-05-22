import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Avatar.module.sass";
import { generateAvararFromHash } from "../../../utils";

const Avatar = ({ user }) => {
  if (user.avatar) {
    return <img className={styles.avatar} src={user.avatar} alt={`${user.fullname} avatar`} />;
  } else {
    const { color, colorLighten } = generateAvararFromHash(user._id);
    const firstChar = user.fullname.charAt(0);
    return (
      <div
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 70.71%)`,
        }}
        className={classNames(styles.avatar, styles.empty)}
      >
        {firstChar}
      </div>
    );
  }
};

Avatar.propTypes = {
  avatar: PropTypes.object,
};

export default Avatar;
