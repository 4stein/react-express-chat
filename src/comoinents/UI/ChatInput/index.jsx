import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Input } from "antd";
import {
  SmileOutlined,
  CameraOutlined,
  AudioOutlined,
  SendOutlined,
} from "@ant-design/icons";
import styles from "./ChatInput.module.sass";

const ChatInput = ({}) => {
  const [value, setValue] = useState("");
  return (
    <div className={classNames(styles.input)}>
      <div className={classNames(styles.smile)}>
        <SmileOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
      </div>
      <Input
        size="large"
        placeholder="Write your message here"
        onChange={(e) => setValue(e.target.value)}
      />
      <div className={classNames(styles.actions)}>
        <CameraOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
        {value.length ? (
          <SendOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
        ) : (
          <AudioOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
        )}
      </div>
    </div>
  );
};

ChatInput.propTypes = {
  online: PropTypes.bool,
};

export default ChatInput;
