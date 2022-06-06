import axios from "../../core/axios/axios";

export default {
  getAll: () => axios.get("/dialogs"),
  create: (partner, autor, text) => axios.post("/dialogs", { partner, autor, text }),
};
