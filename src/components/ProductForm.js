import React, { useState } from "react";

const ProductForm = ({ setProducts }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { 
      name, 
      price: parseFloat(price) || 0, 
      quantity: parseInt(quantity) || 0, 
      imageUrl 
    };

    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => setProducts((prev) => [...prev, data]));

    setName("");
    setPrice("");
    setQuantity("");
    setImageUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
      <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
