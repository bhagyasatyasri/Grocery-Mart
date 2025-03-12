import React from "react";
import "./ProductList.css"; // Import CSS

const ProductList = ({ products, setProducts, cart, setCart }) => {
  const handleAddToCart = (product) => {
    if (product.quantity > 0) {
      setCart([...cart, product]);
      const updatedProducts = products.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setProducts(updatedProducts);
    }
  };

  const handleBuyNow = (product) => {
    if (product.quantity > 0) {
      alert(`🎉 Thank you for your purchase!\n\n🛒 Product: ${product.name}\n💲 Price: $${parseFloat(product.price).toFixed(2)}`);
      const updatedProducts = products.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setProducts(updatedProducts);
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>Price: ₹{parseFloat(product.price).toFixed(2)}</p>
          <p>quantity: {product.quantity > 0 ? product.quantity : "Not Available"}</p>

          <button
            className="btn-add"
            onClick={() => handleAddToCart(product)}
            disabled={product.quantity === 0}
          >
            {product.quantity > 0 ? "Add to Cart" : "Not Available"}
          </button>

          <button
            className="btn-buy"
            onClick={() => handleBuyNow(product)}
            disabled={product.quantity === 0}
          >
            {product.quantity > 0 ? "Buy Now" : "Not Available"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
