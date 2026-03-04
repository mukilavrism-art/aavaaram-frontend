import "./Testimonials.css";
import { useRef, useEffect } from "react";

export default function Testimonials() {
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    const cardWidth = 392; // card + gap
    sliderRef.current.scrollLeft += dir === "left" ? -cardWidth : cardWidth;
  };

  /* 🔥 AUTO SCROLL */
  useEffect(() => {
    const interval = setInterval(() => {
      if (!sliderRef.current) return;

      const slider = sliderRef.current;
      const maxScroll = slider.scrollWidth - slider.clientWidth;

      if (slider.scrollLeft >= maxScroll) {
        slider.scrollLeft = 0; // 🔥 Reset to start
      } else {
        slider.scrollLeft += 392;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const reviews = [
    {
      text: "Excellent quality supplements. I’ve noticed real improvement in digestion and energy levels. Highly recommended.!",
      name: "Jayaraman Arumugadoss",
    },
    {
      text: "Nice products good for health.",
      name: "Satheesh Kumar",
    },
    {
      text: "Prompt delivery and premium packaging. The herbal formulations feel authentic and effective.",
      name: "Shanmugiah Arumugam",
    },
    {
      text: "Consistent quality and trustworthy brand. Aavaaram has become part of my daily routine.",
      name: "Lakshmi Narayanan",
    },
  ];

  return (
    <section className="testimonials">
      <h2>Our Customer Love Us</h2>
      <p>Real experiences. Genuine results. Trusted wellness.</p>

      <div className="slider-wrapper">
        <button className="nav left" onClick={() => scroll("left")}>‹</button>

        <div className="slider" ref={sliderRef}>
          {reviews.map((r, i) => (
            <div className="testimonial-card" key={i}>
              <div className="quote">“</div>
              <p>{r.text}</p>
              <div className="stars">★★★★★</div>
              <h4>{r.name}</h4>
            </div>
          ))}
        </div>

        <button className="nav right" onClick={() => scroll("right")}>›</button>
      </div>
    </section>
  );
}