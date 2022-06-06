import axios from "../../core/axios/axios";

export default {
  login: (postData) => axios.post("/user/login", postData),
  isMe: () => axios.get("/user/me"),
  registration: (postData) => axios.post("/user/registration", postData),
  verifyHash: (hash) => axios.post(`/user/registration/verify?hash=${hash}`),
  findUsers: (name) => axios.get(`/user/find?query=${name}`),
};
