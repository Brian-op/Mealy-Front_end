import React, { useState, useEffect } from "react";
import FormInput from "../shared/FormInput";
import Button from "../shared/Button";
import Modal from "../shared/Modal";
import "./CatererMealForm.css";

const CatererMealForm = ({ initialData = null, onSubmit, onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  const [error, setError] = useState("");


  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        image_url: initialData.image_url || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedPrice = parseFloat(formData.price);

    if (!formData.name || isNaN(parsedPrice)) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    setError("");
    onSubmit({ ...formData, price: parsedPrice });
    onClose(); // optionally close modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="meal-form-container">
        <h2>{initialData ? "Edit Meal" : "Add New Meal"}</h2>
        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit} className="meal-form">
          <FormInput
            label="Meal Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <FormInput
            label="Price ($)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Image URL"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />

          <Button text={initialData ? "Update Meal" : "Add Meal"} type="submit" />
        </form>
      </div>
    </Modal>
  );
};

export default CatererMealForm;
