import React, { useState, useEffect } from "react";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", quantity: "", imageUrl: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddProduct = () => {
    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newProduct, id: Date.now() }),
    })
      .then((res) => res.json())
      .then((data) => setProducts([...products, data]));

    setNewProduct({ name: "", price: "", quantity: "", imageUrl: "" });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" })
      .then(() => setProducts(products.filter((product) => product.id !== id)));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/products/${editingProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingProduct),
    }).then(() => {
      setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
      setEditingProduct(null);
    });
  };

  return (
    <div className="admin-container">
      <h2>🛠 Admin Panel</h2>

      <div>
        <h3>Add Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {editingProduct && (
        <div>
          <h3>Update Product</h3>
          <form onSubmit={handleUpdateProduct}>
            <input
              type="text"
              placeholder="Product Name"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
            />
            <input
              type="number"
              placeholder="Stock Quantity"
              value={editingProduct.quantity}
              onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={editingProduct.imageUrl}
              onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
            />
            <button type="submit">Update Product</button>
            <button onClick={() => setEditingProduct(null)}>Cancel</button>
          </form>
        </div>
      )}

      <h3>📦 Manage Products</h3>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.quantity}</p>
            <button className="btn-edit" onClick={() => handleEdit(product)}>Edit</button>
            <button className="btn-delete" onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
