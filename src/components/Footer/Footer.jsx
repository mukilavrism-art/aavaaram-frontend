// src/components/Footer/Footer.jsx
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">

        {/* 🔥 LOGO + ABOUT */}
        <div className="footer-col footer-brand">
          <img src="/logo/logo.png" alt="Logo" className="footer-logo" />

          <p className="footer-desc">
            Bringing authentic taste and tradition to your home.
            Crafted with love, purity and generations of expertise.
          </p>

          {/* <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaYoutube />
          </div> */}
        </div>

        {/* SAVOURIES */}
      

        {/* SWEETS */}
        {/* <div className="footer-col">
          <h4>Sweets</h4>
          <ul>
            <li>Mittai</li>
            <li>Laddu</li>
            <li>Mysore Pak</li>
            <li>Badhusha</li>
            <li>Jangiri</li>
            <li>Halwa</li>
          </ul>
        </div> */}

        {/* INFORMATION */}
        <div className="footer-col">
          <h4>Information</h4>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Delivery & Shipping</li>
            
            {/* <li>Sitemap</li> */}
          </ul>
        </div>
          <div className="footer-col">
          <h4>Factory:</h4>
          <p>
            Nilakottai, Dindigul District,<br />
           Tamil Nadu - 624201<br />
          </p>
          <p className="phone">📞 +91 63812 52790</p>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <h5>SRG SUPER FOODS INDIA PVT LTD</h5>
          <p>
            No.152B, Pillaiyar Koil Street,<br />
           Mogappair East,<br />
            Chennai - 600037<br />
            Tamilnadu, India.
          </p>
          <p>📧 feedback@aavaaram.com</p>
          <p className="phone">📞 +91 98846 57975 / ☎ 044 4285 5055</p>
          
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
     
        <p>© 2026 Aavaaram. All rights reserved.</p>
        <p>Designed & Developed by <b>Vrism</b></p>
      </div>
    </footer>
  );
}