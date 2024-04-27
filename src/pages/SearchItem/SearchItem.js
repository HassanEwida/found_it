import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import ItemCard from "../../components/ItemCard/ItemCard";
import { items } from "../../test/Items";
import ItemList from '../../components/ItemList/ItemList';

const SearchItem = () => {
    const [ lost, setLost ] = useState([]);
    const [ searchfield, setSearchfield ] = useState('');

    useEffect(()=>{
        setLost(items);
    },[]);

    return(
        <div className="tc">
            <SearchBar />
            <ItemList lost={lost}/>
        </div>
    );
}


export default SearchItem;