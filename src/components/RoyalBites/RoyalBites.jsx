import "./RoyalBites.css";
import { useNavigate } from "react-router-dom";

export default function RoyalBites() {
  const navigate = useNavigate();

  const products = [
  {
      id: 3,
      name: "Classic Groundnut Chikki Bites",
      price: 75,
      reviews: 43,
      rating: 5,
      img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=600",
    },
  {
      id: 3,
      name: "Classic Groundnut Chikki Bites",
      price: 75,
      reviews: 43,
      rating: 5,
      img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=600",
    },
    {
      id: 3,
      name: "Classic Groundnut Chikki Bites",
      price: 75,
      reviews: 43,
      rating: 5,
      img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=600",
    },
    {
      id: 3,
      name: "Classic Groundnut Chikki Bites",
      price: 75,
      reviews: 43,
      rating: 5,
      img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=600",
    },
    {
      id: 5,
      name: "Black Sesame Chikki Bites",
      price: 80,
      reviews: 23,
      rating: 5,
      img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600",
    },
  ];

  return (
    <section className="royal">
      <div className="royal-header">
        <h2>Royal Bites</h2>
        <p>Indulge in the elegant taste of classic sweetness.</p>
      </div>

      <div className="royal-row">
        {/* LEFT CATEGORY CARD */}
        <div className="royal-category">
          <img
            src="https://images.unsplash.com/photo-1621939514610-3b5c5c9f0b9e?q=80&w=600"
            alt="Chikki"
          />
          <div className="category-overlay">
            <h3>Chikki</h3>
            <p>Nutty, crunchy, and delightfully nostalgic</p>
            <button onClick={() => navigate("/category/chikki")}>
              View More
            </button>
          </div>
        </div>

        {/* RIGHT SLIDER */}
        <div className="royal-slider">
          {products.map((p) => (
            <div className="royal-card" key={p.id}>
              <img src={p.img} alt={p.name} />

              <h4>{p.name}</h4>

              <div className="rating">
                {"★".repeat(p.rating)}
                <span>{p.reviews} reviews</span>
              </div>

              <div className="price">Rs. {p.price}.00</div>

              <button>Add To Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
