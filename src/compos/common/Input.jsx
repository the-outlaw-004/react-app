import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <p className="alert alert-danger mt-1">{error}</p>}
    </div>
  );
};

export default Input;
