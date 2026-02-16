import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    try {
      const res = await API.get(`/products/by-category/${id}`);
      setProducts(res.data);
    } catch (err) {
      console.error("CATEGORY PRODUCT ERROR", err);
    }
  };

  return (
    <div className="product-page">
      <h1>Category</h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="product-grid">
          {products.map(p => (
            <div className="product-card" key={p._id}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>Rs. {p.price}</p>
              <button>Add To Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
