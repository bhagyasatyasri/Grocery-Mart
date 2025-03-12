import React from "react";
import "./Cart.css"; // Import the CSS file

const Cart = ({ cart, setCart }) => {
  const handleRemoveFromCart = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      updatedCart.splice(index, 1); // Remove only one instance of the product
      setCart(updatedCart);
    }
  };

  const handleBuyCart = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const totalCost = cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
    alert(`🛒 Thank you for your purchase!\nTotal Cost: $${totalCost.toFixed(2)}`);
    setCart([]); // Clear the cart after purchase
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((product, index) => (
            <div key={index} className="cart-item">
              <img src={product.imageUrl} alt={product.name} className="cart-image" />
              <h3>{product.name}</h3>
              <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
              <button className="btn-danger" onClick={() => handleRemoveFromCart(product)}>
                Remove from Cart
              </button>
            </div>
          ))}
          <button className="btn-primary" onClick={handleBuyCart}>
            Buy All
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
