import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h2 className="logo">Admin Panel</h2>

      <nav>
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/banner">Banner</NavLink>
        <NavLink to="/admin/categories">Categories</NavLink>
        <NavLink to="/admin/products">Products</NavLink>
        <NavLink to="/admin/testimonials">Testimonials</NavLink>
        <NavLink to="/admin/videos">Videos</NavLink>
      </nav>
    </aside>
  );
}
