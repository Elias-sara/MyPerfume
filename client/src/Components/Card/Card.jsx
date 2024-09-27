import React from "react";
import "./Card.css"; // Ensure this file exists in the same directory
import "../../styles.css"; // If you're using global styles from src/styles.css
// import { getData } from "../../db/db.js"; // Corrected path to foodData.js

function Card({ food, onAdd, onRemove }) {
  return (
    <div className="card">
      <h3>{food.title}</h3>
      <p>Price: ${food.price.toFixed(2)}</p>
      <img src={food.image} alt={food.title} className="food-image" />{" "}
      {/* Add image here */}
      <div className="btn-container">
        <button className="btn add" onClick={() => onAdd(food)}>
          Add 
        </button>
        <button className="btn remove" onClick={() => onRemove(food)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default Card;
