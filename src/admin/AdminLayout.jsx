import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import "./AdminLayout.css";

export default function AdminLayout() {
  const location = useLocation();
  const page =
    location.pathname.split("/")[2] || "Dashboard";

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <AdminHeader
          title={page.charAt(0).toUpperCase() + page.slice(1)}
        />

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
