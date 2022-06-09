import React, { useState, useRef, useEffect } from "react";
import { Popover } from "antd";
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
          title={<span>Title</span>}
          content={
            <div>
              <button onClick={() => removeMessage(_id)}>Remove message</button>
            </div>
          }
          trigger="click"
        >
          <div className={styles.messagePopover}>
            <EllipsisOutlined />
          </div>
        </Popover>
        {(audio || text) && (
          <div className={styles.bubble}>
            {!audio && text && <p className={styles.text}>{text}</p>}
            {audio && (
              <div className={styles.audio}>
                <audio ref={audioRef} src={audio} preload="auto" />
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
            )}
          </div>
        )}

        {!audio && isTyping && (
          <div className={styles.typingin}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        {attachments && (
          <div className={styles.attachments}>
            {attachments.map((attachment, index) => (
              <div key={index} className={styles.attachmentsitem}>
                <img src={attachment.url} alt={attachment.fullname} />
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
