import { withFormik } from "formik";
import RegistrationForm from "../components/RegistrationForm";
import validations from "../../../utils/validations";
import store from "../../../redux/store";
import { userActions } from "../../../redux/actions";

import { withRouter } from "react-router-dom";
// import history from "../../../utils/history";

const RegistrationFormContainer = withFormik({
  mapPropsToValues: () => ({
    email: "",
    fullname: "",
    password1: "",
    password2: "",
  }),

  // Custom sync validation
  validate: (values) => {
    const errors = {};
    validations({ isAuth: false, values, errors });

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    store
      .dispatch(userActions.fetchRegistration(values))
      .then(() => {
        setSubmitting(false);
        // history.push("/checkinfo");
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
})(RegistrationForm);

export default withRouter(RegistrationFormContainer);
