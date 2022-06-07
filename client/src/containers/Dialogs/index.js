import React, { useState, useEffect } from "react";
import { dialogsActions } from "../../redux/actions";
import { Dialogs as BaseDialogs } from "../../comoinents/UI";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../core";

const Dialogs = ({ userId, searchValue }) => {
  // useState
  const [filtered, setFiltered] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  // useSelector
  const items = useSelector((state) => state.dialogs.items);
  // useDispatch
  const dispatch = useDispatch();
  // handlers
  const onNewDialog = () => {
    dispatch(dialogsActions.fetchDialogs());
  }
  // useEffect
  useEffect(() => {
    setFiltered(items);
  }, [items]);
  useEffect(() => {
    dispatch(dialogsActions.fetchDialogs());
    
    // socket
    socket.on("SERVER:DIALOG_CREATED", onNewDialog)
    socket.on("SERVER:MESSAGE_CREATED", onNewDialog)
    return () => {
      socket.removeListener("SERVER:DIALOG_CREATED", onNewDialog)
      socket.removeListener("SERVER:MESSAGE_CREATED", onNewDialog)
    }
  }, []);
  useEffect(() => {
    setFiltered(items);
    setIsSearch(!isSearch);
  }, [searchValue]);
  useEffect(() => {
    if (searchValue && searchValue.length) {
      setFiltered([
        ...filtered.filter(
          (dialog) =>
            dialog.partner.fullname
              .toLowerCase()
              .indexOf(searchValue.toLowerCase()) >= 0
        ),
      ]);
    }
  }, [isSearch]);


  return <BaseDialogs items={filtered} userId={userId} />;
};

export default Dialogs;
