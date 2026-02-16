import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import API from "../../services/api";
import "./CollectionPage.css";

export default function CollectionPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (id) {
      API.get(`/collections/${id}`)
        .then(res => setProducts(res.data.products))
        .catch(err => console.error(err));
    }
  }, [id]);

  return (
    <div className="category-page">
      <h2 className="category-title">Collection</h2>

      {products.length === 0 ? (
        <p className="empty-text">No products found</p>
      ) : (
        <div className="product-grid">
          {products.map(p => (
            <div className="product-card" key={p._id}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="price">₹ {p.price}</p>
              <button onClick={() => addToCart(p)}>
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
