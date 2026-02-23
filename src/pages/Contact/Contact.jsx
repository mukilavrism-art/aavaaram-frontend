import "./Contact.css";
import { useState } from "react";
import axios from "axios";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        form
      );

      alert("Message sent successfully ✅");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {
      console.log(error);
      alert("Failed to send ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-page">

      {/* HERO */}
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>Home &gt; Contact us</p>
      </div>

      {/* MAIN SECTION */}
      <div className="contact-container">

        {/* LEFT FORM */}
        <form className="contact-form" onSubmit={handleSubmit}>

          <label>Your Name*</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Your Email*</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Contact Number*</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <label>Your Message*</label>
          <textarea
            rows="5"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">
            {loading ? "Sending..." : "Submit"}
          </button>

        </form>

        {/* RIGHT DETAILS */}
        <div className="contact-details">

          <h4>ADMINISTRATIVE OFFICE</h4>
          <p>
            SRG SUPER FOODS INDIA PVT LTD<br />
            No.152B, Pillaiyar Koil Street,<br />
            Paneer Nagar Main Road, Mogappair East,<br />
            Chennai - 600037, TAMIL NADU, INDIA.
          </p>

          <h5>CONTACT INFORMATION</h5>
          <p className="highlight">
            044 4285 5055 / +91 98846 57975<br />
            feedback@aavaaram.com
          </p>

          <hr />

          <h4>FACTORY LOCATION</h4>
          <p>
            SRG SUPER FOODS INDIA PVT LTD<br />
            No. E4 & E5, Sipcot Industrial Park,<br />
            Nilakottai, Dindigul District - 624201,<br />
            TAMIL NADU, INDIA.
          </p>

          <h5>CONTACT INFORMATION</h5>
          <p className="highlight">
            +91 63812 52790
          </p>

        </div>
      </div>

      {/* MAP SECTION */}
      <div className="map-section">

        {/* Office Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.2177276809934!2d80.17589107505292!3d13.085383212373511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526677ff5d45c9%3A0x92a247144a4595cd!2sAavaaram%20Office!5e0!3m2!1sen!2sin!4v1771828899731!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>

        {/* Factory Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.470604799866!2d77.93390537502!3d10.142348270569189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00b3e93c678d07%3A0x562300d0135daae9!2sSRG%20SUPER%20FOODS%20INDIA%20PVT%20LTD%20(FACTORY)!5e0!3m2!1sen!2sin!4v1771829243367!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>

      </div>

    </section>
  );
}