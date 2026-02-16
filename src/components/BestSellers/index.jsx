import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";

export default function BestSellersPage() {
  const { products } = useProducts();
  const { addToCart } = useCart();

  return (
    <div className="products-page">
      <h2>Best Sellers</h2>

      <div className="best-grid">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
            <p>Rs. {p.price}</p>
            <button onClick={() => addToCart(p)}>Add To Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
