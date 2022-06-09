import axios from "../../core/axios/axios";

export default {
  getAllByDialogId: (id) => axios.get(`/messages/${id}`),
  send: (text, dialogId, attachments) => axios.post("/messages", {
    text,
    dialog_id: dialogId,
    attachments
  }),
  removeById: (id) => axios.delete(`/messages/${id}`),
};
