/* src/components/ProductList.js */
import React from "react";
import "../css/ProductList.css";

const ProductList = ({ products }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "in stock":
        return "status-green"; // CSS class for green
      case "low stock":
        return "status-yellow"; // CSS class for yellow
      case "out of stock":
        return "status-red"; // CSS class for red
      default:
        return "";
    }
  };

  return (
    <div className="product-list">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Status</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.item}</td>
              <td className={getStatusClass(product.Status)}>
                {product.Status}
              </td>
              <td>{product.Quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
