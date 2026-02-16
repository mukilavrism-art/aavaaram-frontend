import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="sidebar-logo">
        <img src="/logo/admin-logo.png" alt="Admin Logo" />
      </div>

      {/* MENU */}
      <nav className="sidebar-menu">
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/categories">Categories</NavLink>
        <NavLink to="/admin/products">Products</NavLink>
        <NavLink to="/admin/banner">Banners</NavLink>
        <NavLink to="/admin/shop">ShopCollection</NavLink>
        <NavLink to="/admin/bookings">Bookings</NavLink>
        <NavLink to="/admin/profile">Profile</NavLink>
      </nav>
    </aside>
  );
}
