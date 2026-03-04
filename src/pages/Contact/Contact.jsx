import "./Contact.css";
import { useState } from "react";
import API from "../../services/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post("/contact", form);

      alert(data?.message || "Message sent successfully ✅");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch (error) {
      console.error("Contact Error:", error);

      alert(
        error?.response?.data?.message ||
        "Server error ❌ Please try again later"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-wrapper">

      {/* CONTACT CARD */}
      <div className="contact-card">

        {/* LEFT PANEL */}
        <div className="contact-left">
          <h3>Contact Us</h3>

          <p>
            SRG SUPER FOODS INDIA PVT LTD <br />
            No.152B, Pillaiyar Koil Street, <br />
            Mogappair East, <br />
            Chennai - 600037
          </p>

          <p>📧 feedback@aavaaram.com</p>
          <p>📞 +91 98846 57975</p>
          <p>☎ 044 4285 5055</p>

          <hr />

          <p>
            <strong>Factory:</strong><br />
            Nilakottai, Dindigul District, <br />
            Tamil Nadu - 624201
          </p>

          <p>📞 +91 63812 52790</p>
        </div>

        {/* RIGHT FORM */}
        <div className="contact-right">
          <h2>Get in Touch</h2>
          <p>Feel free to drop us a message below!</p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Your Phone"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <textarea
              rows="4"
              name="message"
              placeholder="Type your message here..."
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "SEND"}
            </button>

          </form>
        </div>

      </div>

      {/* MAP SECTION */}
      <div className="map-section">

        <iframe
          title="Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.2177276809934!2d80.17589107505292!3d13.085383212373511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526677ff5d45c9%3A0x92a247144a4595cd!2sAavaaram%20Office!5e0!3m2!1sen!2sin!4v1771828899731!5m2!1sen!2sin"
          loading="lazy"
          allowFullScreen
        ></iframe>

        <iframe
          title="Factory Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.470604799866!2d77.93390537502!3d10.142348270569189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00b3e93c678d07%3A0x562300d0135daae9!2sSRG%20SUPER%20FOODS%20INDIA%20PVT%20LTD%20(FACTORY)!5e0!3m2!1sen!2sin!4v1771829243367!5m2!1sen!2sin"
          loading="lazy"
          allowFullScreen
        ></iframe>

      </div>

    </section>
  );
}