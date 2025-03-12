import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>🛒 Grocery Mart</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
