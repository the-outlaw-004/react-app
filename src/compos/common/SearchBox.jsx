import React from "react";

const SearchBox = ({ query, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control"
      placeholder="Search..."
      value={query}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
