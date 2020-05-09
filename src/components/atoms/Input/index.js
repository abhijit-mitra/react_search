import React from 'react';

const Input = ({type, ...rest}) => (
  <input
    type={type}
    className="form-control"
    {...rest}
    />
);

Input.defaultProps ={
  type:'text'
}

export default Input;
