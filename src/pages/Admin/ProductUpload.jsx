import { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import API from "../../services/api";
import "./ProductUpload.css";

export default function ProductUpload() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    shortDescription: "",
    description: "",
    ingredients: "",
    usage: "",
    disclaimer: "",
    // otherNames: "",
    weight: "",
    dimensions: "",
    bestSeller: false,
  });

  const [imageFile, setImageFile] = useState(null);

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

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const saveProduct = async () => {
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) =>
        formData.append(key, form[key])
      );

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editId) {
        await API.put(`/products/${editId}`, formData);
      } else {
        await API.post("/products", formData);
      }

      setOpen(false);
      setEditId(null);
      setImageFile(null);
      setForm({
        name: "",
        price: "",
        category: "",
        shortDescription: "",
        description: "",
        ingredients: "",
        usage: "",
        disclaimer: "",
        // otherNames: "",
        weight: "",
        dimensions: "",
        bestSeller: false,
      });

      fetchProducts();
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    }
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="admin-page">

      {/* HEADER */}
      <div className="page-header">
        <h2>📦 Products</h2>
        <button
          className="add-btn"
          onClick={() => {
            setEditId(null);
            setOpen(true);
          }}
        >
          + Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Weight</th>
              <th>Dimensions</th>
              <th>Best</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>
                  {p.image && (
                    <img src={p.image} className="table-img" alt="" />
                  )}
                </td>
                <td>{p.name}</td>
                <td>₹ {p.price}</td>
                <td>{p.category?.name}</td>
                <td>{p.weight}</td>
                <td>{p.dimensions}</td>
                <td>{p.bestSeller ? "✔" : "-"}</td>

                <td className="action-cell">
                  <button
                    className="three-dot-btn"
                    onClick={() =>
                      setActiveMenu(activeMenu === p._id ? null : p._id)
                    }
                  >
                    <FiMoreVertical />
                  </button>

                  {activeMenu === p._id && (
                    <div className="action-dropdown">
                      <p
                        onClick={() => {
                          setEditId(p._id);
                          setForm({
                            name: p.name,
                            price: p.price,
                            category: p.category?._id,
                            shortDescription: p.shortDescription || "",
                            description: p.description,
                            ingredients: p.ingredients,
                            usage: p.usage,
                            disclaimer: p.disclaimer || "",
                            // otherNames: p.otherNames || "",
                            weight: p.weight,
                            dimensions: p.dimensions,
                            bestSeller: p.bestSeller,
                            healthType: p.healthType || "health",
                          });
                          setOpen(true);
                          setActiveMenu(null);
                        }}
                      >
                        Edit
                      </p>

                      <p
                        className="delete-text"
                        onClick={() => {
                          deleteProduct(p._id);
                          setActiveMenu(null);
                        }}
                      >
                        Delete
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DRAWER */}
      {open && (
        <div
          className="drawer-overlay"
          onClick={() => setOpen(false)}
        >
          <div
            className="drawer"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="drawer-header">
              <h3>{editId ? "Edit Product" : "Add Product"}</h3>
              <button
                className="close-btn"
                onClick={() => setOpen(false)}
              >
                ✖
              </button>
            </div>

            <div className="drawer-content">

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
              <select
  value={form.healthType}
  onChange={(e) =>
    setForm({ ...form, healthType: e.target.value })
  }
>
  <option value="bestseller">Best Seller</option>
  <option value="combo">Combo</option>
  <option value="health">Health Supplement</option>
</select>

              <textarea
                placeholder="Short Description"
                value={form.shortDescription}
                onChange={(e) =>
                  setForm({ ...form, shortDescription: e.target.value })
                }
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <textarea
                placeholder="Ingredients"
                value={form.ingredients}
                onChange={(e) =>
                  setForm({ ...form, ingredients: e.target.value })
                }
              />

              <textarea
                placeholder="Usage"
                value={form.usage}
                onChange={(e) =>
                  setForm({ ...form, usage: e.target.value })
                }
              />

              <textarea
                placeholder="Disclaimer"
                value={form.disclaimer}
                onChange={(e) =>
                  setForm({ ...form, disclaimer: e.target.value })
                }
              />

              {/* <textarea
                placeholder="Other Names"
                value={form.otherNames}
                onChange={(e) =>
                  setForm({ ...form, otherNames: e.target.value })
                }
              /> */}

              <input
                placeholder="Weight"
                value={form.weight}
                onChange={(e) =>
                  setForm({ ...form, weight: e.target.value })
                }
              />

              <input
                placeholder="Dimensions"
                value={form.dimensions}
                onChange={(e) =>
                  setForm({ ...form, dimensions: e.target.value })
                }
              />

              <input type="file" onChange={handleFileChange} />

              <label className="checkbox-row">
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

            </div>

            <div className="drawer-actions">
              <button onClick={saveProduct}>
                {editId ? "Update" : "Save"}
              </button>
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