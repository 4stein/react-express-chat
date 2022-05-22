import { messagesApi } from "../../utils";

// Action Creators
const actions = {
  setMessages: (items) => ({
    type: "MESSAGES:SET_ITEMS",
    payload: items,
  }),
  setIsLoading: (bool) => ({
    type: "MESSAGES:SET_IS_LOADING",
    payload: bool,
  }),

  fetchMessages: (dialogId) => (dispatch) => {
    dispatch(actions.setIsLoading(true));
    messagesApi
      .getAllByDialogId(dialogId)
      .then(({ data }) => {
        dispatch(actions.setMessages(data));
      })
      .catch((e) => {
        console.log(e);
        dispatch(actions.setIsLoading(false));
      });
  },
};

export default actions;
