import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ FETCH CART FROM DATABASE
  const fetchCart = async () => {
    try {
      if (!token) return;

      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data?.items || []);

    } catch (error) {
      console.error("FETCH CART ERROR:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ ADD TO CART (DB)
  const addToCart = async (product) => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      await api.post(
        "/cart/add",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchCart();
      setIsOpen(true);

    } catch (error) {
      console.error("ADD CART ERROR:", error);
    }
  };

  // ✅ REMOVE ITEM (optional – if backend API add pannina)
  const removeItem = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.error("REMOVE CART ERROR:", error);
    }
  };

  const total = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        total,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);