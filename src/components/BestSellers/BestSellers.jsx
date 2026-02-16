import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { FiHeart } from "react-icons/fi";
import API from "../../services/api";
import ProductCard from "../../components/ProductCard";
import "./BestSellers.css";

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/products")
      .then(res => {
        const best = res.data.filter(
          p => p.bestSeller === true
        );
        setProducts(best);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="best-sellers">
      <h2>Best Sellers</h2>

      <div className="best-grid">
        {products.slice(0, 4).map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      <div className="view-more-wrap">
        <button
          className="view-more-btn"
          onClick={() => navigate("/best-sellers")}
        >
          View More
        </button>
      </div>
    </section>
  );
}
