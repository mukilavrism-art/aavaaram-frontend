import { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import "./BannerUpload.css";

export default function BannerUpload() {
  const [banners, setBanners] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  const loadBanners = async () => {
    const res = await fetch(`${API}/api/banners`);
    setBanners(await res.json());
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const uploadNew = async (file, id = null) => {
    const formData = new FormData();
    formData.append("image", file);

    await fetch(`${API}/api/banners${id ? "/" + id : ""}`, {
      method: id ? "PUT" : "POST",
      body: formData,
    });

    loadBanners();
  };

  const deleteBanner = async (id) => {
    if (!window.confirm("Delete banner?")) return;

    await fetch(`${API}/api/banners/${id}`, {
      method: "DELETE",
    });

    loadBanners();
  };

  return (
    <div className="admin-page">
      <h2>Home Banners</h2>

      <label className="upload-btn">
        + Upload Banner
        <input
          type="file"
          hidden
          onChange={(e) => uploadNew(e.target.files[0])}
        />
      </label>

      <div className="banner-grid">
        {banners.map((b) => (
          <div className="banner-card" key={b._id}>
            <img src={b.image} alt="" />

            {/* 🔥 THREE DOT MENU */}
            <div className="action-wrapper">
              <button
                className="three-dot-btn"
                onClick={() =>
                  setActiveMenu(activeMenu === b._id ? null : b._id)
                }
              >
                <FiMoreVertical />
              </button>

              {activeMenu === b._id && (
                <div className="action-dropdown">

                  <label className="dropdown-item">
                    Edit
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        uploadNew(e.target.files[0], b._id);
                        setActiveMenu(null);
                      }}
                    />
                  </label>

                  <p
                    className="dropdown-item delete-text"
                    onClick={() => {
                      deleteBanner(b._id);
                      setActiveMenu(null);
                    }}
                  >
                    Delete
                  </p>

                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}