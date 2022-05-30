let firstPassword = "";
export default ({ isAuth, values, errors }) => {
  const rules = {
    email: (value) => {
      if (!value) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        errors.email = "Invalid email address";
      }
    },
    fullname: (value) => {
      if (!value) {
        errors.fullname = "Required";
      } else if (value.length < 3) {
        errors.fullname = "Too short name";
      }
    },
    password: (value) => {
      if (!value) {
        errors.password = "Required";
      }
    },
    password1: (value) => {
      if (!value) {
        errors.password1 = "Required";
      } else if (value.length < 6) {
        errors.password1 = "Too short code";
      } else if (!/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g.test(value)) {
        errors.password1 = "To simple password";
      }
      firstPassword = value;
    },
    password2: (value) => {
      if (!value) {
        errors.password2 = "Required";
      } else if (firstPassword !== value) {
        errors.password2 = "Confirm Password is not correct";
      }
    },
  };

  Object.keys(values).forEach((key) => rules[key] && rules[key](values[key]));
};
