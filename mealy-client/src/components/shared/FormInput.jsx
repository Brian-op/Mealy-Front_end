import React from "react";
import "./FormInput.css";

const FormInput = ({ label, type = "text", value, onChange, name, placeholder }) => {
  return (
    <div className="form-input">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
