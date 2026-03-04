import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Login.css";
import loginImage from "../../assets/login/loginImage.jpg";

export default function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      navigate("/");

    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">

      {/* LEFT IMAGE SECTION */}
      <div className="login-left">
  <img
    src={loginImage}
    alt="Wellness"
    className="login-image"
  />
</div>

      {/* RIGHT FORM SECTION */}
      <div className="login-right">

        <div className="login-box">

          <h2>Welcome Back</h2>
          <p className="subtitle">
            Login to continue your wellness journey
          </p>

          <form onSubmit={handleSubmit}>

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          {error && <p className="error">{error}</p>}

          <div className="register-link">
            Don't have an account?
            <span onClick={() => navigate("/register")}>
              Create Account
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}