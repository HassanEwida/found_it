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
  const [imageBase64, setImageBase64] = useState(null);

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
  const [imageBase64, setImageBase64] = useState(null);

  const navigate = useNavigate();
  const { state, setState } = useContext(AppContext);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // const onSubmit = (_newCard_) => {
  //   const updatedCard = { ..._newCard_ };
  //   setNewCard(JSON.stringify(updatedCard));
  // };
  const onSubmit = async (data) => {
    if (state?.token) {
      try {
        await axios.post(
          'http://localhost:3001/items/listItem',
          {
            name: data.name,
            brand: data.brand,
            color: data.color,
            location: data.location,
            time: data.time,
            image: data.imageBase64,
            category: data.category,
            contactInfo: data.founderContact,
          },
          {
            headers: {
              Authorization: `Bearer ${state.token}`
            }
          }
        );

        alert('Item listed successfully!');
        navigate('/home');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Unauthorized');
          navigate('/login');
        } else {
          console.error('Error listing item', error);
        }
      }
    } else {
      navigate('/login');
    }
  };


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
            <input {...register('image')} type="file" accept="image/*" onChange={handleImageChange} className="input-field" />
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


