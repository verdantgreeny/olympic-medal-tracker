import React from "react";

const Radio = ({ children, name, onClick, value, checked, onChange }) => {
  return (
    <label>
      <input
        type="radio"
        name={name}
        onClick={onClick}
        value={value}
        checked={checked}
        onChange={onChange}
      />{" "}
      {children}
    </label>
  );
};

export default Radio;
