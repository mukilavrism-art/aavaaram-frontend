import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

import "./WishlistPage.css";

export default function WishlistPage() {

  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div className="wishlist-card" key={item._id}>

              <img src={item.image} alt={item.name} />

              <h3>{item.name}</h3>

              <p className="price">Rs. {item.price}</p>

              <div className="wishlist-actions">

                <button
                  className="cart-btn"
                  onClick={() => addToCart(item)}
                >
                  Add To Cart
                </button>

                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  Remove
                </button>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
