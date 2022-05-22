import React, { useEffect, useRef } from "react";
import { messagesActions } from "../../redux/actions";
import { Messages as BaseMessages } from "../../comoinents/UI";
import { connect } from "react-redux";

const Messages = ({ currentDialogId, fetchMessages, items, isLoading }) => {
  const messagesRef = useRef();
  useEffect(() => {
    fetchMessages(currentDialogId);
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
