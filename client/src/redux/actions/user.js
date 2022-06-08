import { authApi } from "../../utils";
import axios from "../../core/axios/axios";

// Action Creators
const actions = {
  setLogin: () => ({
    type: "USER:SET_LOGIN",
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
    // .catch((e) => {
    //   console.log(e);
    //   localStorage.removeItem("token");
    // })
  },
  fetchLogin: (postData) => (dispatch) => {
    return authApi.login(postData).then(({ data }) => {
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["token"] = localStorage.getItem("token")
      // dispatch(actions.setLogin());
      setTimeout(() => {
        dispatch(actions.fetchUserData());
      }, 1000)
    });
  },
  fetchRegistration: (postData) => (dispatch) => {
    return authApi.registration(postData).then(({ data }) => {
      dispatch(actions.userRegistration(data));
    });
  },
};

export default actions;
