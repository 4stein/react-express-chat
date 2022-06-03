//initialState
let initialState = {
  items: [],
  currentDialogId: window.location.pathname.split('/')[1],
};
//Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "DIALOGS:SET_ITEMS":
      return {
        items: payload,
        currentDialogId: window.location.pathname.split('/')[1]
      };
    case "DIALOGS:SET_CURRENT_DIALOG_ID":
      return {
        ...state,
        currentDialogId: payload,
      };
    default:
      return state;
  }
};

