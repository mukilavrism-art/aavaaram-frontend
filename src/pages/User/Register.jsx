import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Register.css";

export default function RegisterPage() {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await api.post("/auth/register", values);
      message.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      message.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h2>Create Your Account</h2>
        <p className="subtitle">
          Join Aavaaram & begin your wellness journey 🌿
        </p>

        <Form layout="vertical" onFinish={onFinish}>

          <Form.Item
            name="name"
            rules={[{ required: true, message: "Enter your name" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Enter email" },
              { type: "email", message: "Enter valid email" }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email Address" />
          </Form.Item>

          <Form.Item
            name="contact"
            rules={[{ required: true, message: "Enter contact number" }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Enter password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Button
            htmlType="submit"
            loading={loading}
            className="register-btn"
            block
          >
            Register Now
          </Button>

        </Form>

        <p className="login-link">
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </p>

      </div>

    </div>
  );
}