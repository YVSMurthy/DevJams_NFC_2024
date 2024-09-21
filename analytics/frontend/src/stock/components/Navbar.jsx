/* src/components/Navbar.js */
import React, { useState } from "react";
import "../css/Navbar.css";
import logo from "../assets/logo.png";
const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="logo" />
      <h1>Inventory Management</h1>
      <input
        type="text"
        placeholder="Search for an item..."
        className="search-bar"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </nav>
  );
};

export default Navbar;
