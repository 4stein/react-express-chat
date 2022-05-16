import { withFormik } from "formik";
import LoginForm from "../components/LoginForm";
import validations from "../../../utils/validations";

export default withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),

  // Custom sync validation
  validate: (values) => {
    const errors = {};
    validations({isAuth: true, values, errors})
    

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: "BasicForm",
})(LoginForm);