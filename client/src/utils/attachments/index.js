import axios from "../../core/axios/axios";

export default {
  upload: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post("files", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
  },
  delete: (id) => axios.delete(`/files/${id}`),
};
