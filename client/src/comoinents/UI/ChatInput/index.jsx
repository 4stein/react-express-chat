import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Input, Button } from "antd";
import {
  SmileOutlined,
  CameraOutlined,
  AudioOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { UploadField } from "@navjobs/upload";
import Picker from "emoji-picker-react";
import styles from "./ChatInput.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { messagesActions } from "../../../redux/actions";
import TextArea from "antd/lib/input/TextArea";
import UploadFiles from "../UploadFiles";

const ChatInput = () => {
  // useState
  const [value, setValue] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  // useSelector
  const currentDialogId = useSelector((state) => state.dialogs.currentDialogId);
  // useDispatch
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    const el = document.querySelector(
      "button.ant-btn.ant-btn-circle.ant-btn-link"
    );
    document.addEventListener("click", handleOutsideClick.bind(this, el));
    return () => {
      document.removeEventListener("click", handleOutsideClick.bind(this, el));
    };
  }, []);
  useEffect(() => {
    if (chosenEmoji) {
      setValue(value + chosenEmoji.emoji);
    }
  }, [chosenEmoji]);
  // handlers
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  const onSendMessage = (e) => {
    if (e.keyCode === 13) {
      dispatch(messagesActions.fetchSendMessage(value, currentDialogId));
      setEmojiPickerVisible(false);
      setValue("");
    }
  };
  const handleOutsideClick = (el, e) => {
    if (el && !el.contains(e.target)) {
      setEmojiPickerVisible(false);
    }
  };

  return (
    <>
      <div className={classNames(styles.input)}>
        <div className={classNames(styles.smile)}>
          <Button type="link" shape="circle">
            {emojiPickerVisible && (
              <div className="emoji-box">
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <SmileOutlined
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
            />
          </Button>
        </div>
        <TextArea
          size="large"
          placeholder="Write your message here"
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={onSendMessage}
          value={value}
          autoSize={{ minRows: 1, maxRows: 6 }}
        />
        <div className={classNames(styles.actions)}>
          <UploadField
            onFiles={(files) => console.log(files)}
            containerProps={{
              className: "photos",
            }}
            uploadProps={{
              accept: ".png,.jpg,.jpeg,.gif,.bmp",
              multiple: "multiple",
            }}
          >
            <Button type="link" shape="circle" style={{ cursor: "pointer" }}>
              <CameraOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
            </Button>
          </UploadField>

          {value.length ? (
            <Button
              type="link"
              shape="circle"
              onClick={() => {
                dispatch(
                  messagesActions.fetchSendMessage(value, currentDialogId)
                );
                setEmojiPickerVisible(false);
                setValue("");
              }}
            >
              <SendOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
            </Button>
          ) : (
            <Button type="link" shape="circle">
              <AudioOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
            </Button>
          )}
        </div>
      </div>
      {/* <div>
        <UploadFiles />
      </div> */}
    </>
  );
};

ChatInput.propTypes = {
  online: PropTypes.bool,
};

export default ChatInput;
