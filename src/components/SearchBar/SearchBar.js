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
        <div>
                <input className='pa3 ba b--black bg-white w-60' 
                type='search' 
                placeholder='search item'
                value={searchTerm}
                onChange={onSearchChange}
                />
                <button 
                className="button-52" 
                style={{marginLeft: '5px'}} 
                onClick={handleSearchSubmit}>Search</button>
        </div>
    );
}

export default SearchBar;