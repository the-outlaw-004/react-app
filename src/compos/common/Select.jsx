import React from "react";

const Select = ({ name, label, options, error, onChange, value, ...rest }) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={name}>{label}</label>
      {/* <input
        {...rest}
        name={name}
        id={name}
        className="form-control"
      /> */}
      <select name={name} className="form-select" id="" value={value} onChange={onChange}>
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <p className="alert alert-danger mt-1">{error}</p>}
    </div>
  );
};

export default Select;
