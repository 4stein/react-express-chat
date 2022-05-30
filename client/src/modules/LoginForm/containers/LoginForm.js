import { withFormik } from "formik";

import LoginForm from "../components/LoginForm";
import validations from "../../../utils/validations";
import { openNotification } from "../../../utils";
import { userActions } from "../../../redux/actions";
import store from "../../../redux/store";

export default withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),

  // Custom sync validation
  validate: (values) => {
    const errors = {};
    validations({ isAuth: true, values, errors });

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    store
      .dispatch(userActions.fetchLogin(values))
      .then(() => {
        setSubmitting(false);
      })
      .catch((e) => {
        console.log(e);
        openNotification({
          text: "Incorrect password or email",
          type: "error",
          title: "error",
        });
        setSubmitting(false);
      });
  },
  displayName: "BasicForm",
})(LoginForm);
