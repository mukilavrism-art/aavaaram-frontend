import { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Header.css";

export default function Header() {

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [admin, setAdmin] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  /* ✅ Check if already logged in */
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminName = localStorage.getItem("adminName");

    if (token) {
      setAdmin(adminName || "Admin");
    }
  }, []);

  /* ✅ Login */
  const handleLogin = async () => {
    try {
      const res = await API.post("/admin/login", form);

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminName", res.data.name);

      setAdmin(res.data.name);
      setShowMenu(false);
      navigate("/admin");

    } catch (err) {
      alert("Invalid Admin Login");
    }
  };

  /* ✅ Logout */
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    setAdmin(null);
    navigate("/");
  };

  return (
    <div className="profile-wrapper">

      <FiUser
        size={20}
        className="profile-icon"
        onClick={() => setShowMenu(!showMenu)}
      />

      {showMenu && (
        <div className="login-popup">

          {/* 🔥 IF LOGGED IN */}
          {admin ? (
            <>
              <h4>Welcome, {admin}</h4>

              <button
                className="admin-btn"
                onClick={() => navigate("/admin")}
              >
                Go to Dashboard
              </button>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <h4>Admin Login</h4>

              <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <button onClick={handleLogin}>
                Login
              </button>
            </>
          )}

        </div>
      )}
    </div>
  );
}
