import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import API from "../../services/api";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    try {
      const res = await API.get(`/products/category/${id}`);
      setProducts(res.data);
    } catch (err) {
      console.error("CATEGORY PRODUCT ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div className="category-page">
      <h2 className="category-title">Category Products</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <div className="product-card" key={p._id}>

              {/* ❤️ WISHLIST BUTTON */}
              <div
                className={`wishlist-btn ${
                  isInWishlist(p._id) ? "active" : ""
                }`}
                onClick={() => toggleWishlist(p)}
              >
                <FiHeart />
              </div>

              <img
  src={p.image}
  alt={p.name}
  onClick={() => navigate(`/product/${p._id}`)}
  style={{ cursor: "pointer" }}
/>

              <h3>{p.name}</h3>
              <p className="price">₹ {p.price}</p>

              <button
                className="cart-btn"
                onClick={() => addToCart(p)}
              >
                Add To Cart
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
