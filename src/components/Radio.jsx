import React from "react";

const Radio = ({ children, name, value, checked, onChange }) => {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />{" "}
      {children}
    </label>
  );
};

export default Radio;
