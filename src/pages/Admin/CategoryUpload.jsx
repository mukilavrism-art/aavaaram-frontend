import { useEffect, useState } from "react";
import API from "../../services/api";
import "./CategoryUpload.css";

export default function CategoryUpload() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
  const res = await API.get("/categories");
  setCategories(res.data);
};


  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () =>
      setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  const addCategory = async () => {
  if (!form.name) return alert("Category name required");

  try {
    const res = await API.post("/categories", {
      name: form.name,
      description: form.description,
      image: form.image,
    });

    console.log("DB SAVED 👉", res.data);

    setForm({ name: "", description: "", image: "" });
    setOpen(false);
    fetchCategories(); // DB-la irundhu refresh
  } catch (err) {
    console.error("POST ERROR 👉", err);
  }
};


  const removeCategory = async (id) => {
    await API.delete(`/categories/${id}`);
    fetchCategories();
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>📂 Categories</h2>
        <button className="btn-primary" onClick={() => setOpen(true)}>
          + Add Category
        </button>
      </div>

      {open && (
        <div className="card">
          <input
            placeholder="Category Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <input type="file" onChange={uploadImage} />

          {form.image && (
            <img src={form.image} className="preview-img" />
          )}

          <button className="btn-primary" onClick={addCategory}>
            Save
          </button>
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c, i) => (
            <tr key={c._id}>
              <td>{i + 1}</td>
              <td>{c.name}</td>
              <td>
                <button onClick={() => removeCategory(c._id)}>
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
