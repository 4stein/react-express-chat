import axios from "../../core/axios/axios";

export default {
  getAll: () => axios.get("/dialogs"),
};
