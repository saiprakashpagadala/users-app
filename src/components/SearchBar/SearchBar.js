import React from "react";
import './SearchBar.css'

const SearchBar = ({handleSearch}) => {
  const handleChange = (event) => {
    const value = event.target.value;
    handleSearch(value)
  };
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Serach By Name, Email, Role..."
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
