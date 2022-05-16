import React, { useState, useRef, useEffect } from "react";
import styles from "./Message.module.sass";
import PropTypes from "prop-types";
import classNames from "classnames";
import Time from "../Time";
import MessageStatus from "../MessageStatus";
import audiowave from "../../../images/audiowave.svg";
import playSrc from "../../../images/play.svg";
import pauseSrc from "../../../images/pause.svg";
import convertCurrentTime from "../../../utils/convertCurrentTime";

// import classNames from "classnames";

const Message = ({
  avatar,
  user,
  text,
  date,
  audio,
  isMe,
  isReaded,
  attachments,
  isTyping,
}) => {
  // useState
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
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
      audioRef.current.pause();
    }
  }, [isPlaying]);
  // Handlers

  console.log(progress, currentTime);

  return (
    <div
      className={classNames(styles.message, {
        [styles.isme]: isMe,
        [styles.istyping]: isTyping,
        [styles.audiomessage]: audio,
        [styles.msimmage]: attachments && attachments.length === 1,
      })}
    >
      <div className={styles.avatar}>
        <img src={avatar} alt={`Avatar ${user.fullname}`} />
      </div>
      <div className={styles.textbox}>
        <MessageStatus isMe={isMe} isReaded={isReaded} />

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
            <Time date={date} />
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
  date: PropTypes.instanceOf(Date) || PropTypes.string,
  attachments: PropTypes.array,
  isMe: PropTypes.bool,
  isReaded: PropTypes.bool,
  isTyping: PropTypes.bool,
  audio: PropTypes.string,
};

export default Message;
