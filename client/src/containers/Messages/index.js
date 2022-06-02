import React, { useEffect, useRef } from "react";
import { messagesActions } from "../../redux/actions";
import { Messages as BaseMessages } from "../../comoinents/UI";
import { connect } from "react-redux";
import { socket } from "../../core";

const Messages = ({ currentDialogId, fetchMessages, items, isLoading }) => {
  const messagesRef = useRef();
  useEffect(() => {
    if (currentDialogId) {
      fetchMessages(currentDialogId)
    }
    
    // socket
    socket.on("SERVER:MESSAGE_CREATED", (data) => {
      fetchMessages(currentDialogId);
      // dispatch(dialogsActions.fetchDialogs());
      console.log("dialog created", data);
    })
  }, [currentDialogId]);
  useEffect(() => {
    messagesRef.current.scrollTo(0, 999999);
  }, [items]);



  return (
    <BaseMessages
      messagesRef={messagesRef}
      items={items}
      isLoading={isLoading}
    />
  );
};

export default connect(
  ({ messages, dialogs }) => ({
    currentDialogId: dialogs.currentDialogId,
    items: messages.items,
    isLoading: messages.isLoading,
  }),
  messagesActions
)(Messages);
