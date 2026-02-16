import { FaHeart, FaEye, FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product }) {

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const liked = isInWishlist(product._id);

  return (
    <div className="product-card">

      <div className="product-img">
        <img
          src={product.image}
          alt={product.name}
          onClick={() => navigate(`/product/${product._id}`)}
        />

        <div className="img-actions">

          {/* ❤️ Wishlist */}
          <button
            className={liked ? "liked" : ""}
            onClick={() => toggleWishlist(product)}
          >
            <FaHeart />
          </button>

          {/* 👁 View */}
          <button
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <FaEye />
          </button>

        </div>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <div className="rating">
          {[...Array(4)].map((_, i) => (
            <FaStar key={i} />
          ))}
          <span>{product.reviews || 20} reviews</span>
        </div>

        <p className="price">Rs. {product.price}</p>
      </div>

      <button
        className="add-cart"
        onClick={() => addToCart(product)}
      >
        Add To Cart
      </button>

    </div>
  );
}
