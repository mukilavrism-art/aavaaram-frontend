import { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile() {

  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@gmail.com",
    phone: "N/A",
    role: "admin",
    joined: "N/A"
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("adminProfile"));
    if (saved) setProfile(saved);
  }, []);

  const saveProfile = () => {
    localStorage.setItem("adminProfile", JSON.stringify(profile));
    alert("Profile updated");
  };

  return (
    <div className="profile-container">

      <div className="profile-card">

        {/* Top Section */}
        <div className="profile-top">
          <div className="avatar">
            {profile.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2>{profile.name}</h2>
            <p className="email">{profile.email}</p>
          </div>
        </div>

        {/* Info Table */}
        <div className="profile-table">

          <div className="row">
            <div className="label">Role</div>
            <div className="value">
              <span className="badge">{profile.role}</span>
            </div>
          </div>

          <div className="row">
            <div className="label">Phone</div>
            <div className="value">{profile.phone}</div>
          </div>

          <div className="row">
            <div className="label">Joined On</div>
            <div className="value">{profile.joined}</div>
          </div>

        </div>

      </div>

    </div>
  );
}
