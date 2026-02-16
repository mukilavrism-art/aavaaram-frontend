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
          <h2 className="script-title">Taste and Quality carried over generations!</h2>
          <p>
            Mittai Kadai has stood the testament of time by consistently
            providing quality and taste. Currently run by the fourth
            generation, the Mittai Kadai has lived up to the expectations
            of our clients through fresh, healthy and delightful snacks
            and sweets.
          </p>

          <button className="story-btn" onClick={() => navigate("/about")}>
            Our Story
          </button>
        </div>

      </div>
    </section>
  );
}