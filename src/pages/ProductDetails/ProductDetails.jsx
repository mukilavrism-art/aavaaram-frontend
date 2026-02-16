import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import API from "../../services/api";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [form, setForm] = useState({
    name: "",
    comment: "",
  });

  useEffect(() => {
    API.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleReview = async () => {
    if (!form.name || !form.comment || rating === 0) {
      alert("Fill all review fields");
      return;
    }

    await API.post(`/products/${id}/review`, {
      name: form.name,
      rating,
      comment: form.comment,
    });

    const updated = await API.get(`/products/${id}`);
    setProduct(updated.data);

    setForm({ name: "", comment: "" });
    setRating(0);
  };

  if (!product) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div className="product-details">

      {/* LEFT IMAGE */}
      <div className="details-left">
        <img src={product.image} alt={product.name} />
      </div>

      {/* RIGHT INFO */}
      <div className="details-right">
        <h1>{product.name}</h1>
        <p className="price">₹ {product.price}</p>

        <div className="rating-display">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              color={i < Math.round(product.averageRating) ? "#ffc107" : "#ddd"}
            />
          ))}
          <span>({product.reviews?.length || 0} reviews)</span>
        </div>

        <div className="actions">
          <button onClick={() => addToCart(product)}>
            Add To Cart
          </button>

          <FaHeart
            className={`wishlist-icon ${
              isInWishlist(product._id) ? "active" : ""
            }`}
            onClick={() => toggleWishlist(product)}
          />
        </div>

        {/* REVIEW SECTION */}
        <div className="review-section">
          <h3>Write a Review</h3>

          <div className="star-select">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                onClick={() => setRating(i + 1)}
                color={i < rating ? "#ffc107" : "#ddd"}
                className="star"
              />
            ))}
          </div>

          <input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <textarea
            placeholder="Write comment..."
            value={form.comment}
            onChange={(e) =>
              setForm({ ...form, comment: e.target.value })
            }
          />

          <button className="submit-review" onClick={handleReview}>
            Submit Review
          </button>
        </div>

        {/* SHOW REVIEWS */}
        <div className="all-reviews">
          <h3>Customer Reviews</h3>

          {product.reviews?.length === 0 && (
            <p>No reviews yet</p>
          )}

          {product.reviews?.map((r, index) => (
            <div key={index} className="review-card">
              <strong>{r.name}</strong>

              <div>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < r.rating ? "#ffc107" : "#ddd"}
                  />
                ))}
              </div>

              <p>{r.comment}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
