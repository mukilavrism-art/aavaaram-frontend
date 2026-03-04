import { useEffect, useState, useRef } from "react";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAdmin } from "../../context/AdminContext";

import "./Header.css";

export default function Header() {

  const navigate = useNavigate();
  const dropdownRef = useRef();
  const searchRef = useRef();

  const { cart, openCart } = useCart();
  const { wishlist } = useWishlist();
  const { adminToken, logout } = useAdmin();

  // ✅ USER TOKEN FIX
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setUserToken(localStorage.getItem("token"));
  }, []);

  const API = import.meta.env.VITE_API_URL;

  const texts = [
    "🎉 Welcome Offer Coupon Code : WELCOME10",
    "🚚 Free Shipping on Orders Above ₹999",
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [showShop, setShowShop] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  /* 🔥 Fetch categories + products */
  useEffect(() => {
    fetch(`${API}/api/categories`)
      .then(res => res.json())
      .then(setCategories)
      .catch(err => console.error(err));

    fetch(`${API}/api/products`)
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error(err));

    const timer = setInterval(() => {
      setTextIndex(i => (i + 1) % texts.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  /* 🔥 Search filter */
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFiltered([]);
      return;
    }

    const result = products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFiltered(result.slice(0, 6));
  }, [searchQuery, products]);

  /* 🔥 Outside click close */
  useEffect(() => {
    const handleClickOutside = (event) => {

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery}`);
      setShowSearch(false);
      setSearchQuery("");
      setFiltered([]);
    }
  };

  const handleUserLogout = () => {
    localStorage.removeItem("token");
     localStorage.removeItem("user");  
    localStorage.removeItem("cart");
    setUserToken(null);
    navigate("/");
  };

  return (
    <>
      <div className="top-bar">{texts[textIndex]}</div>

      <header className="main-header">

        {/* LOGO */}
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/logo/logo.png" alt="logo" />
        </div>

        {/* MENU */}
        <nav className="menu desktop-menu">
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/about")}>About Us</span>

          <div
            className="shop-menu"
            onMouseEnter={() => setShowShop(true)}
            onMouseLeave={() => setShowShop(false)}
          >
            <span>Shop ▾</span>

            {showShop && (
              <div className="shop-dropdown">
                {categories.map(cat => (
                  <p
                    key={cat._id}
                    onClick={() => navigate(`/category/${cat._id}`)}
                  >
                    {cat.name}
                  </p>
                ))}
              </div>
            )}
          </div>

          <span onClick={() => navigate("/contact")}>Contact</span>
        </nav>

        {/* ICONS */}
        <div className="icons">

          {/* SEARCH */}
          <div className="search-wrapper" ref={searchRef}>
            <FiSearch
              className="icon"
              onClick={() => setShowSearch(!showSearch)}
            />

            {showSearch && (
              <div className="search-box">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </form>

                {filtered.length > 0 && (
                  <div className="search-results">
                    {filtered.map(product => (
                      <div
                        key={product._id}
                        className="search-item"
                        onClick={() => {
                          navigate(`/product/${product._id}`);
                          setShowSearch(false);
                          setSearchQuery("");
                          setFiltered([]);
                        }}
                      >
                        <img src={product.image} alt={product.name} />
                        <div>
                          <p>{product.name}</p>
                          <span>Rs. {product.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* PROFILE */}
          <div className="profile-wrapper" ref={dropdownRef}>
  <FiUser
    className="icon"
    onClick={() => setShowProfile(!showProfile)}
  />

  {showProfile && (
    <div className="profile-dropdown">

      {/* USER LOGIN */}
     {/* PROFILE */}
<div className="profile-wrapper" ref={dropdownRef}>
  <FiUser
    className="icon"
    onClick={() => setShowProfile(!showProfile)}
  />

  {showProfile && (
    <div className="profile-dropdown">

      {/* NOT LOGGED IN */}
      {!userToken && (
        <p onClick={() => navigate("/login")}>
          Login
        </p>
      )}

      {/* USER LOGGED IN */}
     {userToken && (
  <>
    <p onClick={() => {
      navigate("/user-histor");
      setShowProfile(false);
    }}>
      My Orders
    </p>

    <p
      className="logout"
      onClick={() => {
        handleUserLogout();
        setShowProfile(false);
      }}
    >
      Logout
    </p>
  </>
)}

      {/* 🔥 ADMIN UI ONLY IF ADMIN TOKEN EXISTS */}
      {adminToken && (
        <>
          <hr />
          <p onClick={() => navigate("/admin/dashboard")}>
            Admin Dashboard
          </p>
          <p
            className="logout"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Admin Logout
          </p>
        </>
      )}

    </div>
  )}
</div>

    </div>
  )}
</div>

          {/* WISHLIST */}
          <div
            className="icon-badge"
            onClick={() => navigate("/wishlist")}
          >
            <FiHeart />
            {wishlist.length > 0 && <span>{wishlist.length}</span>}
          </div>

          {/* CART */}
          <div
            className="icon-badge"
            onClick={openCart}
          >
            <FiShoppingCart />
            {cart.length > 0 && <span>{cart.length}</span>}
          </div>

          <span
            className="menu-icon"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FiX /> : <FiMenu />}
          </span>
        </div>
      </header>

     {mobileMenu && (
  <div className="mobile-menu">

    {/* CLOSE BUTTON */}
    <div className="mobile-close">
      <FiX onClick={() => {
        setMobileMenu(false);
        setMobileShopOpen(false);
      }} />
    </div>

    {!mobileShopOpen ? (
      <>
        <p onClick={() => { navigate("/"); setMobileMenu(false); }}>
          Home
        </p>

        <p onClick={() => { navigate("/about"); setMobileMenu(false); }}>
          About Us
        </p>

        <p onClick={() => setMobileShopOpen(true)}>
          Shop ▸
        </p>

        <p onClick={() => { navigate("/contact"); setMobileMenu(false); }}>
          Contact
        </p>
      </>
    ) : (
      <>
        <p onClick={() => setMobileShopOpen(false)}>
          ◂ Back
        </p>

        {categories.map(cat => (
          <p
            key={cat._id}
            onClick={() => {
              navigate(`/category/${cat._id}`);
              setMobileMenu(false);
              setMobileShopOpen(false);
            }}
          >
            {cat.name}
          </p>
        ))}
      </>
    )}

  </div>
)}
    </>
  );
}