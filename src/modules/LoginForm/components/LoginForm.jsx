import React, { Component } from "react";
// import PropTypes from 'prop-types'
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./LoginForm.module.sass";
import { Link } from "react-router-dom";
import { UIButton, WhiteBlock } from "../../../comoinents/UI";

export class LoginForm extends Component {
  render() {
    const onFinish = (values) => {
      console.log("Received values of form: ", values);
    };
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
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
              hasFeedback
              validateStatus="success"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
              hasFeedback
              validateStatus="success"
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
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
  }
}

export default LoginForm;
