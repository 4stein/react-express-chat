//initialState
let initialState = {
  items: [],
};
//Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "ATTACHMENTS:ADD_FILES":
      return {
        ...state,
        items: [...state.items, payload],
      };
    case "ATTACHMENTS:REMOVE_FILES":
      return {
        ...state,
        items: state.items.filter(file => file._id !== payload),
      };

    default:
      return state;
  }
};
