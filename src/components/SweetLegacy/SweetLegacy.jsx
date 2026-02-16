import "./SweetLegacy.css";

export default function SweetLegacy() {
  const steps = [
    {
      title: "Land & Herbs",
      img: "/images/land-herbs.jpg",
    },
    {
      title: "Traditional Wisdom",
      img: "/images/traditional-wisdom.jpg",
    },
    {
      title: "Scientific Formulation",
      img: "/images/scientific-formulation.jpg",
    },
    {
      title: "Modern Capsule",
      img: "/images/modern-capsule.jpg",
    },
  ];

  return (
    <section className="sweet-legacy">
      <div className="sweet-header">
        <span className="legacy-sub">STORY SECTION – WHY AAVAARAM</span>
        <h2>From Land to Capsule: Our Journey</h2>
        <p>
          Rooted in generations of knowledge, our ethically sourced ingredients
          meet rigorous quality standards to bring you purity and consistency,
          bridging tradition with modern life.
        </p>
      </div>

      <div className="journey-row">
        {steps.map((step, index) => (
          <div className="journey-item" key={index}>
            <div className="journey-img">
              <img src={step.img} alt={step.title} />
            </div>
            <h4>{step.title}</h4>

            {index !== steps.length - 1 && (
              <div className="arrow">→</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
