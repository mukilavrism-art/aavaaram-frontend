import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SideCart from "../components/SideCart";
import CartDrawer from "../components/CartDrawer/CartDrawer";

export default function UserLayout() {
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* SIDE CART – GLOBAL (all pages) */}
      <SideCart />

      {/* PAGE CONTENT */}
      <main>
        <Outlet />
      </main>
       <CartDrawer />
      {/* FOOTER */}
      <Footer />
    </>
  );
}
