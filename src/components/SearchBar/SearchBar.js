import React, { useState } from "react";

const SearchBar = ({ onSearchSubmit }) => {
    const [ searchTerm, setSearchTerm ] = useState(''); 
    
    const onSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }
    
    
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearchSubmit(searchTerm);

    }

    return(
        <div className='pa5'>
                <div className="input-wrapper">
                    <input className='input-field' 
                    type='search' 
                    value={searchTerm}
                    onChange={onSearchChange}
                    
                    />
                    <span className="input-label">Search Item</span>
                    <span className="input-shadow"></span>
                </div>
                <button 
                className="button-52" 
                style={{marginLeft: '5px'}} 
                onClick={handleSearchSubmit}>Search</button>
        </div>
    );
}

export default SearchBar;