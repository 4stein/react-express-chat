import React, { Component } from "react";
// import PropTypes from 'prop-types'
import { Form, Input } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import styles from "./RegistrationForm.module.sass";
import { Link } from "react-router-dom";
import { UIButton, WhiteBlock } from "../../../comoinents/UI";

const RegistrationForm = (props) => {
  const success = true;
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  return (
    <div>
      <div className={styles.top}>
        <h2>Sign Up</h2>
        <p>Please set uour account info</p>
      </div>
      <WhiteBlock className={styles.block}>
        {success ? (
          <Form
            name="normal_login"
            className="login-form"
            onFinish={handleSubmit}
          >
            <Form.Item
              validateStatus={
                errors.email && touched.email ? "error" : "success"
              }
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
              validateStatus={errors.user && touched.user ? "error" : "success"}
              help={
                errors.user && touched.user && errors.user ? errors.user : null
              }
              hasFeedback
            >
              <Input
                name="user"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.user}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
                size="large"
              />
            </Form.Item>
            <Form.Item
              validateStatus={
                errors.password1 && touched.password1 ? "error" : "success"
              }
              help={
                errors.password1 && touched.password1 && errors.password1
                  ? errors.password1
                  : null
              }
              hasFeedback
            >
              <Input
                name="password1"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password1}
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item
              validateStatus={
                errors.password2 && touched.password2 ? "error" : "success"
              }
              help={
                errors.password2 && touched.password2 && errors.password2
                  ? errors.password2
                  : null
              }
              hasFeedback
            >
              <Input
                name="password2"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password2}
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password Confirm"
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
                Sign Up
              </UIButton>
            </Form.Item>
            <Link className={styles.link} to="login">
              Log In
            </Link>
          </Form>
        ) : (
          <div className={styles.success}>
            <InfoCircleOutlined className={styles.info} />
            <h2>Verify your account</h2>
            <p>A confirmation message has been sent to your email.</p>
          </div>
        )}
      </WhiteBlock>
    </div>
  );
};

export default RegistrationForm;
