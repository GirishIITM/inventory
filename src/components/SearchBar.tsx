import React, { useState } from "react";
import "../styles/searchbar.css"; // Importing the CSS for styling

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass the value back to parent component
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className="search-button" onClick={() => onSearch(searchTerm)}>
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
