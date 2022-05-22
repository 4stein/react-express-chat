import React, { useState, useEffect } from "react";
import { dialogsActions } from "../../redux/actions";
import { Dialogs as BaseDialogs } from "../../comoinents/UI";
import { useDispatch, useSelector } from "react-redux";

const Dialogs = ({ userId, searchValue }) => {
  // useState
  const [filtered, setFiltered] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  // useSelector
  const items = useSelector((state) => state.dialogs.items);
  // useDispatch
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    setFiltered(items);
  }, [items]);
  useEffect(() => {
    dispatch(dialogsActions.fetchDialogs());
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
            dialog.user.fullname
              .toLowerCase()
              .indexOf(searchValue.toLowerCase()) >= 0
        ),
      ]);
    }
  }, [isSearch]);

  return <BaseDialogs items={filtered} userId={userId} />;
};

export default Dialogs;
