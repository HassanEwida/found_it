import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const SearchBar = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(searchTerm, selectedCategory);
    setShowCategoryFilter(false);
  }

  const toggleCategoryFilter = () => {
    setShowCategoryFilter(!showCategoryFilter);
  }

  return (
    <div className="search-bar-container pa5">
      <div className="input-wrapper">
        <input
          className='input-field'
          type='search'
          value={searchTerm}
          onChange={onSearchChange}
        />
        <span className="input-label">Search Item</span>
        <span className="input-shadow"></span>
      </div>
      <div className="filter-container">
        <div className="filter-icon" onClick={toggleCategoryFilter}>
          <FontAwesomeIcon icon={faFilter} />
        </div>
        {showCategoryFilter && (
          <div className="category-filter">
            <select
              className="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              {/* Add more category options as needed */}
            </select>
            <button className="button-52 mt3" onClick={handleSearchSubmit}>
              Apply Filter
            </button>
          </div>
        )}
      </div>
      <button
        className="button-52 mb3"
        onClick={handleSearchSubmit}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <span style={{ marginLeft: "10px" }}>Search</span>
      </button>
    </div>
  );
}

export default SearchBar;
