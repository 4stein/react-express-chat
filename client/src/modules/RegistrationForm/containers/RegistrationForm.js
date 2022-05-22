import { withFormik } from "formik";
import RegistrationForm from "../components/RegistrationForm";
import validations from "../../../utils/validations";

export default withFormik({
  mapPropsToValues: () => ({
    email: "",
    user: "",
    password1: "",
    password2: "",
  }),

  // Custom sync validation
  validate: (values) => {
    const errors = {};
    validations({isAuth: false, values, errors})
    

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: "BasicForm",
})(RegistrationForm);
