import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";   // ✅ FIX
import "./ShopByCollection.css";

export default function ShopByCollection() {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/collections")
      .then(res => setCollections(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="collection">
      <h2>Shop by Collection</h2>

      <div className="collection-row">
        {collections.map(col => (
          <div
            key={col._id}
            className="collection-card"
            onClick={() => navigate(`/collection/${col._id}`)}
          >
            <div className="img-container">
              <img src={col.image} alt={col.name} />
            </div>
            <h4>{col.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
