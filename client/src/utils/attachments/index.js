import axios from "../../core/axios/axios";

export default {
  create: (data) => axios.post("/files", { data }),
  delete: (id) => axios.delete(`/files/${id}`),
};
