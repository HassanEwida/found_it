import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { items } from "../../test/Items";
import ItemList from '../../components/ItemList/ItemList';
import { Link } from 'react-router-dom';

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
        <div>
            <Link to="/home">
                <nav style={{display: 'flex', position: 'start', marginLeft: '30px'}}><button className="button-52">Back</button></nav>
            </Link>
            <div className="tc">
                <SearchBar onSearchSubmit={onSearchSubmit}/>
                <ItemList lost={filteredItems}/>
            </div>
        </div>
    );
}


export default SearchItem;