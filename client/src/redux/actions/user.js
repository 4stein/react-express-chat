import { authApi } from "../../utils";

// Action Creators
const actions = {
  setLogin: (user) => ({
    type: "USER:SET_LOGIN",
    payload: user,
  }),
  checkUser: (user) => ({
    type: "USER:CHECK_USER",
    payload: user,
  }),
  userRegistration: (user) => ({
    type: "USER:SET_REGISTRATION",
    payload: user,
  }),

  fetchUserData: () => (dispatch) => {
    return authApi.isMe().then(({ data }) => {
      dispatch(actions.checkUser(data));
    });
  },
  fetchLogin: (postData) => (dispatch) => {
    return authApi.login(postData).then(({ data }) => {
      localStorage.setItem("token", data.token);
      dispatch(actions.fetchUserData());
    });
  },
  fetchRegistration: (postData) => (dispatch) => {
    return authApi.registration(postData).then(({ data }) => {
      dispatch(actions.userRegistration(data));
    });
  },
};

export default actions;
