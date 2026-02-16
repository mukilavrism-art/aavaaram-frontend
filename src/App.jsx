import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AdminProvider } from "./context/AdminContext";   // ✅ ADD

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <AdminProvider>   {/* ✅ ADD THIS */}
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AdminProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
