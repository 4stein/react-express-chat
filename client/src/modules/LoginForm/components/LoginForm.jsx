import React from "react";
// import PropTypes from 'prop-types'
import { Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./LoginForm.module.sass";
import { Link } from "react-router-dom";
import { UIButton, WhiteBlock } from "../../../comoinents/UI";

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
          <Form.Item
            validateStatus={errors.email && touched.email ? "error" : "success"}
            help={
              errors.email && touched.email && errors.email
                ? errors.email
                : null
            }
            hasFeedback
          >
            <Input
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              prefix={<MailOutlined />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>
          <Form.Item
            validateStatus={
              errors.password && touched.password ? "error" : "success"
            }
            help={
              errors.password && touched.password && errors.password
                ? errors.password
                : null
            }
            hasFeedback
          >
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

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
