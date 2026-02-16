import { useEffect, useState } from "react";
import API from "../../services/api";
import "./CollectionUpload.css";

export default function CollectionUpload() {
  const [collections, setCollections] = useState([]);
  const [name, setName] = useState("");

  const loadCollections = async () => {
    const res = await API.get("/collections");
    setCollections(res.data);
  };

  useEffect(() => {
    loadCollections();
  }, []);

  const addCollection = async () => {
    if (!name) return alert("Enter collection name");
    await API.post("/collections", { name });
    setName("");
    loadCollections();
  };

  const deleteCollection = async (id) => {
    await API.delete(`/collections/${id}`);
    loadCollections();
  };

  return (
    <div className="admin-page">
      <h2>📦 Collections</h2>

      <div className="add-row">
        <input
          placeholder="Collection name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addCollection}>Add</button>
      </div>

      <div className="list">
        {collections.map((c) => (
          <div key={c._id} className="item">
            <span>{c.name}</span>
            <button onClick={() => deleteCollection(c._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
