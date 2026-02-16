import { useEffect, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Products() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/admin/products", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p._id}>
          {p.name} - Rs.{p.price}
        </div>
      ))}
    </div>
  );
}
