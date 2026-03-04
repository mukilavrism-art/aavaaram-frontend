import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import ProductCard from "../../components/ProductCard";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [tab, setTab] = useState("description");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reviewName, setReviewName] = useState("");
const [reviewRating, setReviewRating] = useState(5);
const [reviewComment, setReviewComment] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/products/${id}`);
      setProduct(res.data);

      if (res.data?.category?._id) {
        const relatedRes = await API.get(
          `/products/category/${res.data.category._id}`
        );

        setRelated(
          relatedRes.data.filter((p) => p._id !== id)
        );
      }

    } catch (err) {
      console.log("Error fetching product:", err.message);
    } finally {
      setLoading(false);
    }
  };
  const submitReview = async () => {
  try {
    await API.post(`/products/${id}/review`, {
      name: reviewName,
      rating: reviewRating,
      comment: reviewComment,
    });

    setReviewName("");
    setReviewComment("");
    setReviewRating(5);

    fetchProduct(); // refresh reviews
  } catch (err) {
    console.log(err);
  }
};

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;
  if (!product) return <p style={{ padding: 40 }}>Product not found</p>;

  return (
    <div className="product-page">

      {/* ================= TOP SECTION ================= */}
      <div className="product-top">

        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">

          <span className="stock">IN STOCK</span>

          <h1>{product.name}</h1>
          {/* ⭐ RATING DISPLAY */}
<div className="product-rating">
  <div className="stars">
    {"★".repeat(Math.round(product.averageRating || 0))}
    {"☆".repeat(5 - Math.round(product.averageRating || 0))}
  </div>

  <span className="rating-text">
    {product.averageRating?.toFixed(1) || 0}/5
    {" "}
    ({product.reviews.length})
  </span>
</div>

          <p className="price">₹ {product.price}</p>

          {/* ✅ SHORT DESCRIPTION (TOP) */}
          {product.shortDescription && (
            <p className="short-desc">
              {product.shortDescription}
            </p>
          )}

          {/* QUANTITY + CART */}
          <div className="cart-row">

            <div className="qty-box">
              <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>

            <button
              className="add-cart-btn"
              onClick={() => addToCart({ ...product, qty })}
            >
              ADD TO CART
            </button>

          </div>

          {/* WISHLIST */}
          <div
            className={`wishlist ${isInWishlist(product._id) ? "active" : ""}`}
            onClick={() => toggleWishlist(product)}
          >
            {isInWishlist(product._id)
              ? "❤️ Added to wishlist"
              : "♡ Add to wishlist"}
          </div>

          <div className="meta">
            <p>
              <strong>Category:</strong> {product.category?.name}
            </p>
          </div>

        </div>
      </div>

      {/* ================= TABS SECTION ================= */}
      <div className="tabs-section">

        <div className="tabs">
          <button
            className={tab === "description" ? "active" : ""}
            onClick={() => setTab("description")}
          >
            Description
          </button>

          <button
            className={tab === "info" ? "active" : ""}
            onClick={() => setTab("info")}
          >
            Additional Information
          </button>
        </div>

        <div className="tab-content">

          {/* ===== DESCRIPTION TAB ===== */}
          {tab === "description" && (
            <div className="description-box">

              {/* ✅ FULL DESCRIPTION */}
              {product.description && (
                <>
                  <h4>Product Description</h4>
                  <p>{product.description}</p>
                </>
              )}

              {product.ingredients && (
                <>
                  <h4>Ingredients</h4>
                  <p>{product.ingredients}</p>
                </>
              )}

              {product.usage && (
                <>
                  <h4>Recommended Usage</h4>
                  <p>{product.usage}</p>
                </>
              )}

              {/* {product.otherNames && (
                <>
                  <h4>Other Names</h4>
                  <p>{product.otherNames}</p>
                </>
              )} */}

              {product.disclaimer && (
                <>
                  <h4>Disclaimer</h4>
                  <p className="disclaimer-text">
                    {product.disclaimer}
                  </p>
                </>
              )}

            </div>
          )}

          {/* ===== ADDITIONAL INFO TAB ===== */}
          {tab === "info" && (
            <table className="info-table">
              <tbody>

                {product.weight && (
                  <tr>
                    <td>Weight</td>
                    <td>{product.weight}</td>
                  </tr>
                )}

                {product.dimensions && (
                  <tr>
                    <td>Dimensions</td>
                    <td>{product.dimensions}</td>
                  </tr>
                )}

                {product.category && (
                  <tr>
                    <td>Category</td>
                    <td>{product.category?.name}</td>
                  </tr>
                )}

                <tr>
                  <td>Country of Origin</td>
                  <td>India</td>
                </tr>

              </tbody>
            </table>
          )}

        </div>
      </div>
      <div className="foundation-section">
  <p className="foundation-sub">Our foundation</p>
  <h2>Innovation meets integrity.</h2>

  <div className="foundation-grid">
    <div>
      <h3>No. 1</h3>
      <p>Nutritionist Recommended Brand</p>
    </div>
    <div>
      <h3>5 Million</h3>
      <p>Satisfied Global Customers</p>
    </div>
    <div>
      <h3>20+</h3>
      <p>Clinical Studies</p>
    </div>
    <div>
      <h3>US FDA</h3>
      <p>Registered Manufacturing Facility</p>
    </div>
  </div>
</div>
{/* ================= CUSTOMER REVIEWS ================= */}
{/* ================= CUSTOMER REVIEWS ================= */}
<div className="review-section">

  <h2 className="review-title">Customer Reviews</h2>

  <div className="review-summary">

    {/* LEFT - Average Rating */}
    <div className="review-average-box">
      <div className="average-number">
        {product.averageRating?.toFixed(2) || "0.00"}
      </div>

      <div className="average-stars">
        {"★".repeat(Math.round(product.averageRating || 0))}
        {"☆".repeat(5 - Math.round(product.averageRating || 0))}
      </div>

      <p>Based on {product.reviews.length} reviews</p>
    </div>

    {/* CENTER - Breakdown */}
    <div className="review-breakdown-box">
      {[5,4,3,2,1].map((star) => {
        const total = product.reviews.length;
        const count = product.reviews.filter(r => r.rating === star).length;
        const percent = total ? (count / total) * 100 : 0;

        return (
          <div key={star} className="breakdown-row">
            <span>{star} ★</span>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percent}%` }}
              />
            </div>

            <span className="rating-count">{count}</span>
          </div>
        );
      })}
    </div>

    {/* RIGHT - Write Button */}
    <div className="review-action">
      <button
        className="write-review-btn"
        onClick={() =>
          document
            .getElementById("review-form")
            .scrollIntoView({ behavior: "smooth" })
        }
      >
        Write A Review
      </button>
    </div>

  </div>

  {/* ===== REVIEW FORM ===== */}
  <div className="review-form" id="review-form">
    <h3>Write Your Review</h3>

    <input
      placeholder="Your name"
      value={reviewName}
      onChange={(e) => setReviewName(e.target.value)}
    />

    <select
      value={reviewRating}
      onChange={(e) => setReviewRating(Number(e.target.value))}
    >
      {[5,4,3,2,1].map(n => (
        <option key={n} value={n}>{n} Star</option>
      ))}
    </select>

    <textarea
      placeholder="Write your review..."
      value={reviewComment}
      onChange={(e) => setReviewComment(e.target.value)}
    />

    <button onClick={submitReview}>
      Submit Review
    </button>
  </div>

  {/* ===== REVIEW LIST ===== */}
  <div className="review-list">
    {product.reviews.map((r, index) => (
      <div key={index} className="review-card">
        <div className="review-avatar">
          {r.name?.charAt(0)}
        </div>

        <div className="review-content">
          <div className="review-header-row">
            <strong>{r.name}</strong>
            <span className="verified-badge">Verified</span>
          </div>

          <div className="review-stars">
            {"★".repeat(r.rating)}
            {"☆".repeat(5 - r.rating)}
          </div>

          <p>{r.comment}</p>
        </div>
      </div>
    ))}
  </div>

</div>
      {/* ================= RELATED PRODUCTS ================= */}
      {related.length > 0 && (
        <div className="related-section">
          <h2>Related products</h2>

          <div className="related-grid">
            {related.slice(0, 4).map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}


    </div>
  );
}