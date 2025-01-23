import React from "react";

const Radio = ({children,name,defaultChecked,onClick}) => {

  return (
    <>
      <label>
        <input type="radio" name={name} onClick={onClick} defaultChecked={defaultChecked}  /> {children}
      </label>
    </>
  );
};

export default Radio;
