import { useEffect, useState } from "react";
import API from "../../services/api";
import "./ProductUpload.css";

export default function ProductUpload() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    bestSeller: false,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await API.get("/categories");
    setCategories(res.data);
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const saveProduct = async () => {
    await API.post("/products", {
      ...form,
      price: Number(form.price),
    });

    setOpen(false);
    setForm({
      name: "",
      price: "",
      category: "",
      image: "",
      bestSeller: false,
    });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>📦 Products</h2>
        <button className="add-btn" onClick={() => setOpen(true)}>
          + Add Product
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Best</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, index) => (
            <tr key={p._id}>
              <td>{index + 1}</td>
              <td>
                <img src={p.image} className="table-img" />
              </td>
              <td>{p.name}</td>
              <td>₹ {p.price}</td>
              <td>{p.category?.name}</td>
              <td>{p.bestSeller ? "✔" : "-"}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(p._id)}
                >
                  ✖
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {open && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Product</h3>

            <input
              placeholder="Product Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input type="file" onChange={uploadImage} />

            <label>
              <input
                type="checkbox"
                checked={form.bestSeller}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bestSeller: e.target.checked,
                  })
                }
              />
              Best Seller
            </label>

            <div className="modal-actions">
              <button onClick={saveProduct}>Save</button>
              <button
                className="cancel-btn"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
