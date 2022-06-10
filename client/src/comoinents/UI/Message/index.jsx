import React, { useState, useRef, useEffect } from "react";
import { Popover, Button, Modal } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import styles from "./Message.module.sass";
import PropTypes from "prop-types";
import classNames from "classnames";
import Time from "../Time";
import MessageStatus from "../MessageStatus";
import audiowave from "../../../images/audiowave.svg";
import playSrc from "../../../images/play.svg";
import pauseSrc from "../../../images/pause.svg";
import convertCurrentTime from "../../../utils/convertCurrentTime";
import Avatar from "../Avatar";
import { useDispatch } from "react-redux";
import { messagesActions } from "../../../redux/actions";

// import classNames from "classnames";

const Message = ({
  _id,
  user,
  text,
  date,
  audio,
  isMe,
  readed,
  attachments,
  isTyping,
}) => {
  // useState
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  // useDispatch
  const dispatch = useDispatch();
  // useRef
  const audioRef = useRef();
  // useEffect
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      audioRef.current.addEventListener("timeupdate", () => {
        const duration = (audioRef.current && audioRef.current.duration) || 0;
        setCurrentTime(audioRef.current.currentTime);
        setProgress((audioRef.current.currentTime / duration) * 100);
      });
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      });
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);
  // Handlers
  const removeMessage = (id) => dispatch(messagesActions.removeMessageById(id));
  const showImageModal = (e) => {
    setPreviewImage(e.target.src);
  };

  return (
    <div
      className={classNames(styles.message, {
        [styles.isme]: isMe,
        [styles.istyping]: isTyping,
        [styles.audiomessage]: audio,
        [styles.msimmage]: attachments && attachments.length === 1,
        [styles.msimmages]: attachments && attachments.length > 1,
      })}
    >
      <div className={styles.avatar}>
        <Avatar user={user} />
      </div>
      <div className={styles.textbox}>
        <MessageStatus isMe={isMe} isReaded={readed} />
        <Popover
          placement="bottomLeft"
          content={
            <div>
              <Button onClick={() => removeMessage(_id)}>Remove message</Button>
            </div>
          }
          trigger="click"
        >
          <div className={styles.messagePopover}>
            <EllipsisOutlined />
          </div>
        </Popover>
        {text ? (
          <div className={styles.bubble}>
            <p className={styles.text}>{text}</p>
          </div>
        ) : (
          <div className={styles.bubble}>
            <div className={styles.audio}>
              <audio ref={audioRef} src={attachments[0].url} preload="auto" />
              <div
                className={styles.audioprogress}
                style={{ width: progress + "%" }}
              ></div>
              <div className={styles.audioinfo}>
                <div className={styles.audiobtn}>
                  <button
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                    }}
                  >
                    {isPlaying ? (
                      <img src={pauseSrc} alt="play icon" />
                    ) : (
                      <img src={playSrc} alt="play icon" />
                    )}
                  </button>
                </div>
                <div className={styles.audiowave}>
                  <img src={audiowave} alt="audio wave" />
                </div>
                <div className={styles.audioduration}>
                  <span>{convertCurrentTime(currentTime)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!audio && isTyping && (
          <div className={styles.typingin}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        {attachments && attachments[0]?.ext !== "webm" && (
          <div className={styles.attachments}>
            {attachments.map((attachment, index) => (
              <div key={index} className={styles.attachmentsitem}>
                <img
                  src={attachment.url}
                  alt={attachment.fullname}
                  onClick={showImageModal}
                />
              </div>
            ))}
          </div>
        )}
        {date && (
          <span className={styles.date}>
            <Time date={new Date(date)} />
          </span>
        )}
      </div>
      <Modal
        visible={previewImage}
        footer={null}
        onCancel={() => setPreviewImage(null)}
      >
        <img className={styles.previewImage} src={previewImage} alt="Preview" />
      </Modal>
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
  attachments: PropTypes.array,
  isMe: PropTypes.bool,
  readed: PropTypes.bool,
  isTyping: PropTypes.bool,
  audio: PropTypes.string,
};

export default Message;
