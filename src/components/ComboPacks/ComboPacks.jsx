import "./ComboPacks.css";

export default function ComboPacks() {
  const combos = [
    {
      id: 1,
      name: "Liver Detox Combo",
      desc: "Rejuvenate your system for urban living.",
      img: "/images/combo-liver.png",
    },
    {
      id: 2,
      name: "Sleep & Relaxation Combo",
      desc: "Unwind naturally. Restful nights assured.",
      img: "/images/combo-sleep.png",
    },
    {
      id: 3,
      name: "Daily Vitality Combo",
      desc: "Boost energy & immunity. Stay active.",
      img: "/images/combo-vitality.png",
    },
  ];

  return (
    <section className="combo-packs">
      <div className="combo-header">
        <span className="combo-sub">COMBO SECTION</span>
        <h2>Designed for Real Indian Lifestyles – Special Combos</h2>
      </div>

      <div className="combo-grid">
        {combos.map((c) => (
          <div className="combo-card" key={c.id}>
            <img src={c.img} alt={c.name} />
            <h3>{c.name}</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
