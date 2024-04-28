import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { items } from "../../test/Items";
import ItemList from '../../components/ItemList/ItemList';

const SearchItem = () => {
    const [ lost, setLost ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState('');

    useEffect(()=>{
        setLost(items);
    },[]);

    const onSearchSubmit = (searchTerm) => {
        setSearchTerm(searchTerm);
    }
    
    const filteredItems = lost.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        <div className="tc">
            <SearchBar onSearchSubmit={onSearchSubmit}/>
            <ItemList lost={filteredItems}/>
        </div>
    );
}


export default SearchItem;