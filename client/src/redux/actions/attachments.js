import { attachmentsApi } from "../../utils";

// Action Creators
const actions = {
  addFiles: (items) => ({
    type: "ATTACHMENTS:ADD_FILES",
    payload: items,
  }),
  removeFiles: (id) => ({
    type: "ATTACHMENTS:REMOVE_FILES",
    payload: id,
  }),

  fetchFilesToServer: () => (dispatch) => {
    attachmentsApi.upload().then(({ data }) => {
      dispatch(actions.setFiles(data));
    });
  },
};

export default actions;
