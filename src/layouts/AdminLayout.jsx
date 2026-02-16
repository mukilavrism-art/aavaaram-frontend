import AdminSidebar from "../components/AdminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <main style={{
        marginLeft: 240,
        padding: 40,
        width: "100%",
        background: "#f6f6f6",
        minHeight: "100vh"
      }}>
        <Outlet />
      </main>
    </div>
  );
}
