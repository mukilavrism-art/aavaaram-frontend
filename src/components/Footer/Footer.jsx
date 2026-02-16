// src/components/Footer/Footer.jsx
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">

        <div className="footer-col">
          <h4>Savouries</h4>
          <ul>
            <li>Sev</li>
            <li>Seeval</li>
            <li>Mixture</li>
            <li>Murukku</li>
            <li>Fried Nuts</li>
            <li>Chips</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Sweets</h4>
          <ul>
            <li>Mittai</li>
            <li>Laddu</li>
            <li>Mysore Pak</li>
            <li>Badhusha</li>
            <li>Jangiri</li>
            <li>Halwa</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Information</h4>
          <ul>
            <li>About Us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Delivery & Shipping</li>
            <li>Return Policy</li>
            <li>Sitemap</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>My Account</h4>
          <ul>
            <li>My Account</li>
            <li>Order History</li>
            <li>Wish List</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>
            No 77, Pillayar Kovil Street,<br />
            Sattur - 626203,<br />
            Virudhunagar District,<br />
            Tamilnadu, India.
          </p>
          <p className="phone">📞 +91 95009 93465</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>License Number: 12422032000859</p>
        <p>© 2025 Sattur Mittai Kadai. All rights reserved.</p>
        <p>
          Designed & Developed by <b>Weone Digital</b>
        </p>
      </div>
    </footer>
  );
}
