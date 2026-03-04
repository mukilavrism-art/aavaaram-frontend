import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart } from "react-icons/fa";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const liked = isInWishlist(product._id);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  return (
    <div className="premium-card">

      {/* IMAGE */}
      <div
        className="premium-img"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <img src={product.image} alt={product.name} />

        <FaHeart
          className="wishlist-icon"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          color={liked ? "red" : "#999"}
        />
      </div>

      {/* PACK OPTIONS */}
      {/* <div className="pack-row">
        <span>Pack:</span>
        <div className="pack-options">
          <span className="active">1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </div>
      </div> */}

      {/* RATING */}
      <div className="rating-box">
        ⭐ {product.averageRating?.toFixed(1) || "4.8"}/5
        {" "}
        ({product.reviews?.length || 360})
      </div>

      {/* TITLE */}
      <h3 onClick={() => navigate(`/product/${product._id}`)}>
        {product.name}
      </h3>

      {/* TAGS (static for now) */}
      <div className="tag-row">
        <span>Skin Radiance</span>
        <span>Pigmentation</span>
      </div>

      {/* PRICE */}
      <div className="price-row">
        <span className="new-price">₹{product.price}</span>
        <span className="old-price">₹{product.price + 100}</span>
        <span className="save">Save 5%</span>
      </div>

      {/* BUTTON */}
      <button className="cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>

    </div>
  );
}