import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import './ListItem.css';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { AppContext } from '../../app-context';

const customIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);
  const [placeName, setPlaceName] = useState('');

  const fetchPlaceName = async (lat, lng) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      setPlaceName(response.data.display_name);
      onLocationSelect(response.data.display_name);
    } catch (error) {
      console.error('Error fetching place name:', error);
    }
  };

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      fetchPlaceName(lat, lng);
    },
  });

  return position ? <Marker position={position} icon={customIcon}><Popup>{placeName}</Popup></Marker> : null;
}

const ListItem = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [newCard, setNewCard] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  const navigate = useNavigate();
  const { state, setState } = useContext(AppContext);



  useEffect(() => {
    if(state) {
      if(state?.token) {
        axios.post(`http://localhost:3001/items/listItem`, {
          headers: {
            "Authorization": "Bearer " + state.token
          }
        }).then(response => {
          const result = response.data;

          onSubmit(result)
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  // const onSubmit = (_newCard_) => {
  //   const updatedCard = { ..._newCard_ };
  //   setNewCard(JSON.stringify(updatedCard));
  // };
  const onSubmit = async (newItem) => {

    try {
        const { user, token } = (await axios.post(`http://localhost:3001/items/listItem`, {
          name: newItem.name,
          brand: newItem.brand,
          color: newItem.color,
          location: newItem.Location,
          time: newItem.time,
          image: newItem.image,
          category: newItem.category,
          contactInfo: newItem.founderContact,
        })).data;


        setState({
            user,
            token
        });

        navigate('/home');

    } catch(err) {
        console.log(err);
    }
}


  return (
    <div>
      <nav style={{ display: 'flex', position: 'start', marginLeft: '30px' }}>
        <Link to="/home">
          <button className="button-52">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span style={{ marginLeft: '10px' }}>Back</span>
          </button>
        </Link>
      </nav>
      <div className="pa5">
        <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left', margin: 'auto', width: '100%', maxWidth: '800px' }}>
          <div className="input-wrapper">
            <input {...register('name', { required: true })} className="input-field" />
            <span className="input-label">Name of Object:</span>
            <span className="input-shadow"></span>
          </div>
          <div className="input-wrapper">
            <input {...register('brand')} className="input-field" />
            <span className="input-label">Brand:</span>
            <span className="input-shadow"></span>
          </div>
          <div className="input-wrapper">
            <input {...register('color')} className="input-field" />
            <span className="input-label">Color:</span>
            <span className="input-shadow"></span>
          </div>
          <div className="input-wrapper">
            <select {...register("category")} className="input-field">
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
            </select>
            <span className="input-label">Category:</span>
            <span className="input-shadow"></span>
          </div>
          <div className="input-wrapper">
            <input {...register('time')} type="datetime-local" className="input-field" />
            <span className="input-label">Time when found:</span>
            <span className="input-shadow"></span>
          </div>
          <div className="input-wrapper">
            <input {...register('founderContact', { required: true })} className="input-field" />
            <span className="input-label">Founder's Contact Information:</span>
            <span className="input-shadow"></span>
          </div>
          <div className="input-wrapper">
            <input {...register('image')} type="file" accept="image/*" className="input-field" />
            <span className="input-label">Image of the Object:</span>
            <span className="input-shadow"></span>
          </div>
          <div className="input-wrapper">
            <span>Location when found:</span>
            {userLocation ? (
              <MapContainer center={userLocation} zoom={13} style={{ height: '400px' }}>
                <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker onLocationSelect={(placeName) => setValue('location', placeName)} />
              </MapContainer>
            ) : (
              <p>Getting user location...</p>
            )}
            <input type="hidden" {...register('location')} />
          </div>
          <p>{console.log(newCard)}</p>
          <button type="submit" className="button-52">
            <FontAwesomeIcon icon={faPlus} />
            <span style={{ marginLeft: '10px' }}>Create new item</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListItem;


