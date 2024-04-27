import React from "react";

const SearchBar = () => {
    return(
        <div>
            <input className='pa3 ba b--black bg-white w-60' 
            type='search' 
            placeholder='search item'
            />
            <button className="button-52" style={{marginLeft: '5px'}}>Search</button>
        </div>
    );
}

export default SearchBar;