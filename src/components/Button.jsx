import React from 'react'

const Button = function ({ children, onClick, id }) {
    return <button id={id} onClick={onClick}> {children} </button>;
  };

export default Button