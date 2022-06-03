import axios from "../../core/axios/axios";

export default {
  getAllByDialogId: (id) => axios.get(`/messages/${id}`),
  send: (text, dialogId) => axios.post("/messages", {
    text,
    dialog_id: dialogId
  }),
};
