/* src/App.js */
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";


const Stock = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const data = [
    { item: "Milk", Status: "In Stock", Quantity: "20" },
    { item: "Milkybar", Status: "In Stock", Quantity: "40" },
    { item: "Chocolate", Status: "In Stock", Quantity: "15" },
    { item: "Pepper", Status: "Out of Stock", Quantity: "-" },
    { item: "Bread", Status: "In Stock", Quantity: "50" },
    { item: "Apples", Status: "In Stock", Quantity: "30" },
    { item: "Butter", Status: "Low Stock", Quantity: "5" },
    { item: "Eggs", Status: "In Stock", Quantity: "100" },
    { item: "Yogurt", Status: "Out of Stock", Quantity: "-" },
    { item: "Cheese", Status: "In Stock", Quantity: "25" },
    { item: "Carrots", Status: "In Stock", Quantity: "40" },
    { item: "Chicken", Status: "Low Stock", Quantity: "7" },
    { item: "Bananas", Status: "In Stock", Quantity: "60" },
    { item: "Orange Juice", Status: "Out of Stock", Quantity: "-" },
    { item: "Tomatoes", Status: "In Stock", Quantity: "35" },
    { item: "Pasta", Status: "In Stock", Quantity: "80" },
  ];


  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredData = data.filter((product) =>
    product.item.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <Dashboard products={filteredData} />

    </div>
  );
};

export default Stock;
