// /* src/components/Dashboard.js */
// import React from "react";
// import "../css/Dashboard.css";

// const Dashboard = ({ products }) => {
//   // Calculate stats
//   const totalItems = products.length;
//   const inStockItems = products.filter(
//     (product) => product.Status === "In Stock"
//   ).length;
//   const outOfStockItems = products.filter(
//     (product) => product.Status === "Out of Stock"
//   ).length;
//   const lowStockItems = products.filter(
//     (product) => product.Status === "Low Stock"
//   ).length;

//   return (
//     <div className="dashboard">
//       <div className="stat-card" style={{ backgroundColor: "#007bff" }}>
//         <h2>{totalItems}</h2>
//         <p>Total Items</p>
//       </div>
//       <div className="stat-card" style={{ backgroundColor: "#28a745" }}>
//         <h2>{inStockItems}</h2>
//         <p>In Stock</p>
//       </div>
//       <div className="stat-card" style={{ backgroundColor: "#ffc107" }}>
//         <h2>{lowStockItems}</h2>
//         <p>Low Stock</p>
//       </div>
//       <div className="stat-card" style={{ backgroundColor: "#dc3545" }}>
//         <h2>{outOfStockItems}</h2>
//         <p>Out of Stock</p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


/* src/components/Dashboard.js */
import React, { useState } from "react";
import "../css/Dashboard.css";
import ProductList from "./ProductList";
import Navbar from "./Navbar"; // Import the Navbar component

const Dashboard = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Total"); // Track current status filter

  const filterProducts = (products, term) => {
    return products.filter(product =>
      product.item.toLowerCase().includes(term.toLowerCase())
    );
  };

  const totalItems = products.length;
  const inStockItems = products.filter(product => product.Status === "In Stock");
  const outOfStockItems = products.filter(product => product.Status === "Out of Stock");
  const lowStockItems = products.filter(product => product.Status === "Low Stock");

  const handleFilter = (status) => {
    setStatusFilter(status); // Update the status filter
    let updatedProducts;

    switch (status) {
      case "Total":
        updatedProducts = products;
        break;
      case "In Stock":
        updatedProducts = inStockItems;
        break;
      case "Low Stock":
        updatedProducts = lowStockItems;
        break;
      case "Out of Stock":
        updatedProducts = outOfStockItems;
        break;
      default:
        updatedProducts = products;
    }

    // Apply the search filter on the updated products
    setFilteredProducts(filterProducts(updatedProducts, searchTerm));
  };

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term

    // Filter products based on the current status filter
    let updatedProducts;

    switch (statusFilter) {
      case "Total":
        updatedProducts = products;
        break;
      case "In Stock":
        updatedProducts = inStockItems;
        break;
      case "Low Stock":
        updatedProducts = lowStockItems;
        break;
      case "Out of Stock":
        updatedProducts = outOfStockItems;
        break;
      default:
        updatedProducts = products;
    }

    // Filter the products based on the search term
    setFilteredProducts(filterProducts(updatedProducts, term));
  };

  return (
    <div className="dashboard-container">
      <Navbar onSearch={handleSearch} />
      <div className="dashboard">
        <div
          className="stat-card"
          onClick={() => handleFilter("Total")}
          style={{
            backgroundColor: "#007bff",
            backgroundImage:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0))",
            boxShadow:
              "inset 0 0 10px rgba(255, 255, 255, 0.5), 0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
          }}
        >
          <h2>{totalItems}</h2>
          <p>Total Items</p>
        </div>
        <div
          className="stat-card"
          onClick={() => handleFilter("In Stock")}
          style={{
            backgroundColor: "#28a745",
            backgroundImage:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0))",
            boxShadow:
              "inset 0 0 10px rgba(255, 255, 255, 0.5), 0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
          }}
        >
          <h2>{inStockItems.length}</h2>
          <p>In Stock</p>
        </div>
        <div
          className="stat-card"
          onClick={() => handleFilter("Low Stock")}
          style={{
            backgroundColor: "#ffc107",
            backgroundImage:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0))",
            boxShadow:
              "inset 0 0 10px rgba(255, 255, 255, 0.5), 0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
          }}
        >
          <h2>{lowStockItems.length}</h2>
          <p>Low Stock</p>
        </div>
        <div
          className="stat-card"
          onClick={() => handleFilter("Out of Stock")}
          style={{
            backgroundColor: "#dc3545",
            backgroundImage:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0))",
            boxShadow:
              "inset 0 0 10px rgba(255, 255, 255, 0.5), 0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
          }}
        >
          <h2>{outOfStockItems.length}</h2>
          <p>Out of Stock</p>
        </div>
      </div>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Dashboard;

