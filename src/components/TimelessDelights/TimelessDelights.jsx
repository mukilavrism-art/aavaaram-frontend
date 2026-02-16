import "./TimelessDelights.css";
import { useNavigate } from "react-router-dom";

export default function TimelessDelights() {
  const navigate = useNavigate();

  return (
    <section className="timeless">
      <div className="timeless-inner">

        {/* LEFT CONTENT */}
        <div className="timeless-left">
          <h2>Timeless Delights</h2>
          <p>
            A taste of India's heritage in every<br />
            sweet and savoury.
          </p>

          <button onClick={() => navigate("/about")}>
            Our Story
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="timeless-right">
          <div className="video-box">
            <img
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800"
              alt="Timeless Delight"
            />
            <div className="play-btn">▶</div>
          </div>

          <div className="badge-box">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400"
              alt="Since 1914"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
