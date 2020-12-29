import React from "react";
import { sendLoginRequest } from "./loginPageSlice";
import { useDispatch } from "react-redux";
import { selectToken } from "../auth/authSlice";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default function LoginPage() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const { username, password } = values;
    dispatch(sendLoginRequest(username, password));
  };

  return (
    <div className="login-page">
      {token !== null ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="login-form-remember-me">
                Remember me
              </Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="/register">register now!</a>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
