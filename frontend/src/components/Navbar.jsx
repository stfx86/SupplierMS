import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* <h1 className="navbar-title">SupplierMS</h1> */}
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/suppliers">Suppliers</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/RegisterSupplier">RegisterSupplier</Link></li>
      </ul>
    </nav>
  );    
}

export default Navbar;
