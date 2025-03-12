import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList products={products} setProducts={setProducts} cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
