import "./TimelessDelights.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import timelessImg from "../../assets/timeless.jpg";
import badgeImg from "../../assets/badge.jpg";

export default function TimelessDelights() {
  const navigate = useNavigate();
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <>
      <section className="timeless">
        <div className="timeless-inner">

          {/* LEFT CONTENT */}
          <div className="timeless-left">
            <h2>
              Timeless Wellness,<br />
              Trusted for Generations
            </h2>

            <p>
              Inspired by India’s rich herbal heritage, Aavaaram blends tradition with innovation.
              Our mission is simple — deliver pure, effective and responsibly crafted wellness
              solutions for today’s generation.
            </p>

            <button onClick={() => navigate("/about")}>
              Our Story
            </button>
          </div>

          {/* RIGHT CONTENT */}
          <div className="timeless-right">
            <div className="video-box">
              <img
                src={timelessImg}
                alt="Timeless Delight"
              />

              <div
                className="play-btn"
                onClick={() => setPlayVideo(true)}
              >
                ▶
              </div>
            </div>

            <div className="badge-box">
              <img
                src={badgeImg}
                alt="Since 1914"
              />
            </div>
          </div>

        </div>
      </section>

      {/* VIDEO MODAL */}
      {playVideo && (
        <div className="video-modal">
          <div className="video-container">
            <span
              className="close-video"
              onClick={() => setPlayVideo(false)}
            >
              ✕
            </span>

            <video
              src="/videos/your-video.mp4"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </>
  );
}