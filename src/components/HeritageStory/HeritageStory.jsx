import "./HeritageStory.css";
import { useNavigate } from "react-router-dom";

export default function HeritageStory() {
  const navigate = useNavigate();

  return (
    <section className="heritage">
      <div className="heritage-inner">

        {/* LEFT IMAGE WITH GOLD FRAME */}
        <div className="heritage-image-wrapper">
          <div className="gold-frame">
            <img
              src="https://images.unsplash.com/photo-1526817575615-368f3b68f6f3?q=80&w=600"
              alt="Founder"
            />
            <span className="since-text">Since 1914</span>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="heritage-content">
          <h2 className="script-title">A Legacy of Quality, Carried Forward with Care</h2>
          <p>
           For generations, we have believed in the healing power of nature. Today, we continue that legacy with advanced research, ethical sourcing, and uncompromising quality standards. Every product reflects our dedication to authenticity, purity, and trust.
          </p>

          <button className="story-btn" onClick={() => navigate("/about")}>
            Discover Our Journey
          </button>
        </div>

      </div>
    </section>
  );
}