import axios from "../../core/axios/axios";

export default {
  getAllByDialogId: (id) => axios.get(`/messages/${id}`),
};
