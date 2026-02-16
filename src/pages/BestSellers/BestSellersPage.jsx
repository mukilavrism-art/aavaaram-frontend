import { useEffect, useState } from "react";
import API from "../../services/api";
import ProductCard from "../../components/ProductCard";
import "./BestSellersPage.css";

export default function BestSellersPage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then(res => {
        const best = res.data.filter(p => p.bestSeller === true);
        setProducts(best);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="best-page">
      <h1>Best Sellers</h1>

      {products.length === 0 ? (
        <p>No best sellers found</p>
      ) : (
        <div className="best-grid">
          {products.map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
