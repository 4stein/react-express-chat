//initialState
let initialState = {
  items: [],
  currentDialogId: null,
};
//Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "DIALOGS:SET_ITEMS":
      return {
        items: payload,
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

// Action Creators
// export const setItemsAction = (payload) => ({
//   type: "DIALOGS:SET_ITEMS",
//   payload,
// });

// Redux Thunk Creator
// export const setItemsTC = () => async (dispatch) => {
//   try {
//     dispatch(setItemsAction(payload));
//   } catch (e) {
//     console.log(e);
//   }
// };
