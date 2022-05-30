import React from "react";
// import PropTypes from 'prop-types'
import { Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./LoginForm.module.sass";
import { Link } from "react-router-dom";
import { FormInput, UIButton, WhiteBlock } from "../../../comoinents/UI";

const LoginForm = (props) => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  return (
    <div>
      <div className={styles.top}>
        <h2>Log In</h2>
        <p>Please log in your account</p>
      </div>
      <WhiteBlock className={styles.block}>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={handleSubmit}
        >
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
            size="large"
            Icon={MailOutlined}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
            size="large"
            Icon={LockOutlined}
          />
          <Form.Item>
            <UIButton
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
            >
              Log In
            </UIButton>
          </Form.Item>
          <Link className={styles.link} to="registration">
            Sign Up
          </Link>
        </Form>
      </WhiteBlock>
    </div>
  );
};

export default LoginForm;
