import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { items } from "../../test/Items";
import ItemList from '../../components/ItemList/ItemList';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


// const SearchItem = () => {
//     const [ lost, setLost ] = useState([]);
//     const [ searchTerm, setSearchTerm ] = useState('');

//     useEffect(()=>{
//         setLost(items);
//     },[]);

//     const onSearchSubmit = (searchTerm) => {
//         setSearchTerm(searchTerm);
//     }
    
//     const filteredItems = lost.filter(item => 
//         item.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
const SearchItem = () => {
    const [lost, setLost] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
  
    useEffect(() => {
      setLost(items);
    }, []);
  
    const onSearchSubmit = (searchTerm, selectedCategory) => {
      setSearchTerm(searchTerm);
      setCategory(selectedCategory);
    }
  
    const filteredItems = lost.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === '' || item.category === category)
    );

    return(
        <div>
                <nav style={{display: 'flex', position: 'start', marginLeft: '30px'}}>
                    <Link to="/home">
                        <button className="button-52">
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span style={{ marginLeft: '10px' }}>Back</span>
                        </button>
                    </Link>
                </nav>
            <div>
                <SearchBar onSearchSubmit={onSearchSubmit}/>
                <ItemList lost={filteredItems}/>
            </div>
        </div>
    );
}

export default SearchItem;