import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ FETCH WISHLIST
  const fetchWishlist = async () => {
    try {
      if (!token) return;

      const res = await api.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(res.data?.products || []);

    } catch (error) {
      console.error("FETCH WISHLIST ERROR:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ✅ TOGGLE
  const toggleWishlist = async (product) => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      await api.post(
        "/wishlist/toggle",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchWishlist();

    } catch (error) {
      console.error("TOGGLE WISHLIST ERROR:", error);
    }
  };

  const isInWishlist = (id) =>
    wishlist.some((item) => item._id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);