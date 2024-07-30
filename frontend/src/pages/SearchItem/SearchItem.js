import React, { useContext, useEffect, useMemo, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import ItemList from '../../components/ItemList/ItemList';
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { AppContext } from "../../app-context";

const SearchItem = () => {
    const [lost, setLost] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
  
    const navigate = useNavigate();
    const { state, setState } = useContext(AppContext);

    useEffect(() => {
      if(state) {
        if(state?.token) {
          axios.get(`http://localhost:3001/items/search`, {
            headers: {
              "Authorization": "Bearer " + state.token
            }
          }).then(response => {
            const result = response.data;

            setLost(result);
          }).catch(err => {
            if(err.response.status === 401) {
              alert('Unauthorized')
              navigate('/login');
            }
          });
        } else {
          navigate('/login');
        }
      } 
    }, [state]);
  
    const onSearchSubmit = (searchTerm, selectedCategory) => {
      setSearchTerm(searchTerm);
      setCategory(selectedCategory);
    }
  
    const filteredItems = useMemo(() => {
      return lost?.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === '' || item.category === category)
      );
    }, [lost, searchTerm, category]);

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
                <Navbar />
                <nav style={{ display: 'flex', position: 'end', marginLeft: '30px' }}></nav>
            <div>
                <SearchBar onSearchSubmit={onSearchSubmit}/>
                <ItemList lost={filteredItems}/>
            </div>
        </div>
    );
}

export default SearchItem;