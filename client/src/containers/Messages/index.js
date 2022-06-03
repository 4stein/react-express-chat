import React, { useEffect, useRef } from "react";
import { messagesActions } from "../../redux/actions";
import { Messages as BaseMessages } from "../../comoinents/UI";
import { connect } from "react-redux";
import { socket } from "../../core";

const Messages = ({ currentDialogId, fetchMessages, addMessage, items, isLoading, user }) => {
  const messagesRef = useRef();

  const onNewMessage = (data) => {
    addMessage(data);
  }

  useEffect(() => {
    if (currentDialogId) {
      fetchMessages(currentDialogId);
    }

    // socket
    socket.on("SERVER:MESSAGE_CREATED", onNewMessage);

    return () => {
      socket.removeListener("SERVER:MESSAGE_CREATED", onNewMessage);
    }
  }, [currentDialogId]);
  useEffect(() => {
    messagesRef.current.scrollTo(0, 999999);
  }, [items]);



  return (
    <BaseMessages
      messagesRef={messagesRef}
      items={items}
      user={user}
      isLoading={isLoading}
    />
  );
};

export default connect(
  ({ messages, dialogs, user }) => ({
    currentDialogId: dialogs.currentDialogId,
    items: messages.items,
    isLoading: messages.isLoading,
    user: user.user
  }),
  messagesActions
)(Messages);
