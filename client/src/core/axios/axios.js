import axios from "axios";

axios.defaults.baseURL = "http://localhost:9999";
axios.defaults.headers.common["token"] = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";

export default axios;
