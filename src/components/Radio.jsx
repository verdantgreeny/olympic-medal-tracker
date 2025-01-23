import React from "react";

const Radio = ({children,name,defaultChecked,onClick,value}) => {

  return (
    <>
      <label>
        <input type="radio" name={name} onClick={onClick} defaultChecked={defaultChecked} value={value} /> {children}
      </label>
    </>
  );
};

export default Radio;
