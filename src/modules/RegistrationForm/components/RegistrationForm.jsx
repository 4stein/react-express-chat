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

export class RegistrationForm extends Component {
  render() {
    const success = true;
    const onFinish = (values) => {
      console.log("Received values of form: ", values);
    };
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
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
                hasFeedback
                validateStatus="success"
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Email"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="user"
                rules={[{ required: true, message: "Please input your Name!" }]}
                hasFeedback
                validateStatus="success"
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Name"
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
              <Form.Item
                name="password2"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                hasFeedback
                validateStatus="success"
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
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
  }
}

export default RegistrationForm;
