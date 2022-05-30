import { Form, Input } from "antd";
import React from "react";

const FormInput = ({
  name,
  type,
  placeholder,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  size,
  Icon,
}) => {
  return (
    <Form.Item
      validateStatus={errors[name] && touched[name] ? "error" : "success"}
      help={errors[name] && touched[name] && errors[name] ? errors[name] : null}
      hasFeedback
    >
      <Input
        name={name}
        type={type}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        prefix={<Icon />}
        placeholder={placeholder}
        size={size}
      />
    </Form.Item>
  );
};

export default FormInput;
