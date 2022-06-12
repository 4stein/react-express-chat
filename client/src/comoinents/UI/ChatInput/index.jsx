import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button } from "antd";
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
import { attachmentsApi } from "../../../utils";
import { socket } from "../../../core";

const ChatInput = ({ setIsTyping }) => {
  // vars
  let isTypingInterval = null;
  // useState
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  // useSelector
  const currentDialogId = useSelector((state) => state.dialogs.currentDialogId);
  const userId = useSelector((state) => state.user.user._id);
  // useDispatch
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    const el = document.querySelector(
      "button.ant-btn.ant-btn-circle.ant-btn-link"
    );
    document.addEventListener("click", handleOutsideClick.bind(this, el));

    // socket
    socket.on("DYALOGS:TYPING", onTyping);

    return () => {
      document.removeEventListener("click", handleOutsideClick.bind(this, el));
      socket.removeListener("DYALOGS:TYPING", onTyping);
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
      if (isRecording) {
        mediaRecorder.stop();
      } else if (value || attachments.length) {
        dispatch(
          messagesActions.fetchSendMessage(
            value,
            currentDialogId,
            attachments.map((att) => att._id)
          )
        );
        setEmojiPickerVisible(false);
        setValue("");
        setAttachments([]);
      }
    }
  };
  const handleOutsideClick = (el, e) => {
    if (el && !el.contains(e.target)) {
      setEmojiPickerVisible(false);
    }
  };
  const onSelectFiles = async (files) => {
    let resFiles = [];
    for (let i = 0; i < files.length; i++) {
      let fLength = files.length - 1;
      const file = files[i];
      let res = await attachmentsApi.upload(file);
      resFiles = [...resFiles, res.data.file];
    }
    setAttachments([...attachments, ...resFiles]);
  };
  const onStopRecording = () => {
    mediaRecorder.stop();
  };

  window.navigator.getUserMedia =
    window.navigator.getUserMedia ||
    window.navigator.mozGetUserMedia ||
    window.navigator.msGetUserMedia ||
    window.navigator.webkitGetUserMedia;

  const onRecord = () => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, onRecording, onError);
    }
  };

  const sendAudio = (audioId) => {
    return dispatch(
      messagesActions.fetchSendMessage(null, currentDialogId, [audioId])
    );
  };

  const onRecording = (stream) => {
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    recorder.start();
    recorder.onstart = () => {
      setIsRecording(true);
    };
    recorder.onstop = () => {
      setIsRecording(false);
    };
    recorder.ondataavailable = (e) => {
      const file = new File([e.data], "audio.webm");
      attachmentsApi.upload(file).then(({ data }) => {
        sendAudio(data.file._id);
      });
    };
  };

  const onError = (err) => {
    console.log("The following error occured: " + err);
  };

  const onKeyDownTyping = () => {
    socket.emit("DYALOGS:TYPING", userId);
  };

  const onTyping = (data) => {
    setIsTyping({ isTyping: true, userId: data });
    clearInterval(isTypingInterval);
    isTypingInterval = setTimeout(() => {
      setIsTyping({ isTyping: false, userId: "" });
    }, 5000);
  };

  return (
    <>
      <div className={styles.dialogTextarea}>
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
            onKeyDown={onKeyDownTyping}
            value={value}
            autoSize={{ minRows: 1, maxRows: 6 }}
          />
          <div className={classNames(styles.actions)}>
            <UploadField
              onFiles={(files) => onSelectFiles(files)}
              containerProps={{
                className: "photos",
              }}
              uploadProps={{
                accept: ".png,.jpg,.jpeg,.gif,.bmp",
                multiple: "multiple",
              }}
            >
              <Button type="link" shape="circle" style={{ cursor: "pointer" }}>
                <CameraOutlined
                  style={{ fontSize: "18px", cursor: "pointer" }}
                />
              </Button>
            </UploadField>

            {value.length ? (
              <Button
                type="link"
                shape="circle"
                onClick={() => {
                  dispatch(
                    messagesActions.fetchSendMessage(
                      value,
                      currentDialogId,
                      attachments.map((att) => att._id)
                    )
                  );
                  setEmojiPickerVisible(false);
                  setValue("");
                  setAttachments([]);
                }}
              >
                <SendOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
              </Button>
            ) : (
              <Button
                type="link"
                shape="circle"
                onMouseDown={onRecord}
                onMouseUp={onStopRecording}
              >
                <AudioOutlined
                  style={{ fontSize: "18px", cursor: "pointer" }}
                  className={classNames({
                    [styles.isrecording]: isRecording,
                  })}
                />
              </Button>
            )}
          </div>
        </div>
      </div>
      <div>
        <UploadFiles
          attachments={attachments}
          setAttachments={setAttachments}
        />
      </div>
    </>
  );
};

ChatInput.propTypes = {
  online: PropTypes.bool,
};

export default ChatInput;
