import React from "react";
import Button from "../shared/Button";
import "./MealCard.css";

const MealCard = ({ meal, onSelect, showSelectButton = true }) => {
  const { name, price, description, image_url } = meal;

  return (
    <div className="meal-card">
      {image_url && (
        <img src={image_url} alt={name} className="meal-card-image" />
      )}
      <div className="meal-card-body">
        <h3 className="meal-name">{name}</h3>
        <p className="meal-desc">{description || "No description."}</p>
        <p className="meal-price">${price.toFixed(2)}</p>

        {showSelectButton && (
          <Button text="Select Meal" onClick={() => onSelect(meal)} />
        )}
      </div>
    </div>
  );
};

export default MealCard;
