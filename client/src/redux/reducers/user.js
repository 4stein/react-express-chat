//initialState
let initialState = {
  user: [],
  isAuth: false,
};
//Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER:SET_LOGIN":
      return {
        isAuth: true,
      };
    case "USER:CHECK_USER":
      return {
        ...state,
        user: payload,
        isAuth: true,
      };
    case "USER:SET_REGISTRATION":
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};
