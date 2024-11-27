import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Modal from 'react-modal';
import modalStyling from './modalStyling.css';

const customIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const EditItemModal = ({ isOpen, onRequestClose, item, token, onSave }) => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [userLocation, setUserLocation] = useState(null);
  const [imageBase64, setImageBase64] = useState(item?.image || '');

  useEffect(() => {
    if (item) {
      reset(item); // Populate form with item data
      setImageBase64(item.image || '');
      setValue('location', item.location);
    }
  }, [item, reset, setValue]);

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

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`http://localhost:3001/items/modifyItem/${item._id}`, {
        ...data,
        image: imageBase64,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 200) {
        onSave(response.data);
        onRequestClose();
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error updating item:', error.response ? error.response.data : error.message);
    }
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit Item Modal">
      <h2>Edit Item</h2>
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
              <Marker position={userLocation} icon={customIcon}>
                <Popup>{item.location}</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p>Getting user location...</p>
          )}
          <input type="hidden" {...register('location')} />
        </div>
        <button type="submit" className="button-52">
          Save Changes
        </button>
        <button type="button" className="button-52" onClick={onRequestClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default EditItemModal;