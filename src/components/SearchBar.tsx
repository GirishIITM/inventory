import React, { useState } from "react";
import "../styles/searchbar.css"; // Importing the CSS for styling

interface SearchBarProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
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
        placeholder={placeholder}
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
