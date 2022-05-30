import React, { useState } from "react";
import { Form, Result } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import styles from "./RegistrationForm.module.sass";
import history from "../../../utils/history";
import { FormInput, UIButton, WhiteBlock } from "../../../comoinents/UI";

const RegistrationForm = (props) => {
  // useState
  const [seccess, setSeccess] = useState(false);
  // Props
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  // Handlers
  const onHandleSubmitHandler = () => {
    handleSubmit();
    setSeccess(true);
  };
  const onLoginHandler = () => {
    history.push("/login");
  };
  return (
    <div>
      {!seccess && (
        <div className={styles.top}>
          <h2>Sign Up</h2>
          <p>Please set uour account info</p>
        </div>
      )}
      <WhiteBlock className={styles.block}>
        {!seccess ? (
          <Form
            name="normal_login"
            className="login-form"
            onFinish={onHandleSubmitHandler}
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
              name="fullname"
              type="text"
              placeholder="User Fullname"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
              size="large"
              Icon={UserOutlined}
            />
            <FormInput
              name="password1"
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
            <FormInput
              name="password2"
              type="password"
              placeholder="Confirm Password"
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
                Sign Up
              </UIButton>
            </Form.Item>
            <Link className={styles.link} to="login">
              Log In
            </Link>
          </Form>
        ) : (
          <div className={styles.success}>
            <Result
              status="success"
              title="Account created"
              subTitle="Your account successfully created"
              extra={
                <UIButton
                  type="primary"
                  htmlType="button"
                  className="login-form-button"
                  size="large"
                  onClick={() => {
                    onLoginHandler();
                  }}
                >
                  Log In
                </UIButton>
              }
            />
          </div>
        )}
      </WhiteBlock>
    </div>
  );
};

export default RegistrationForm;
