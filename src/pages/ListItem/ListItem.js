import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './ListItem.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect(lat, lng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

const ListItem = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [newCard, setNewCard] = useState('');
  const [userLocation, setUserLocation] = useState(null);

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

  const onSubmit = (_newCard_) => {
    const { location, ...rest } = _newCard_;
    const [latitude, longitude] = location.split(',');
    const updatedCard = {
      ...rest,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    };
    setNewCard(JSON.stringify(updatedCard));
  };

  return (
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
          <input {...register('time')} type="datetime-local" className="input-field" />
          <span className="input-label">Time when found:</span>
          <span className="input-shadow"></span>
        </div>
        <div className="input-wrapper">
          <input {...register('founderName', { required: true })} className="input-field" />
          <span className="input-label">Founder's Name:</span>
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
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker onLocationSelect={(lat, lng) => setValue('location', `${lat},${lng}`)} />
            </MapContainer>
          ) : (
            <p>Getting user location...</p>
          )}
          <input type="hidden" {...register('location')} />
        </div>
        <p>{console.log(newCard)}</p>
        <button type="submit" className="button-52">Create new item</button>
      </form>
    </div>
  );
};

export default ListItem;


// import React, { useState } from "react";
// import { useForm } from 'react-hook-form';
// import './ListItem.css';

// const ListItem = () => {
//     const { register, handleSubmit } = useForm();
//     const [ newCard, setNewCard ] = useState("");
    
//     return(
//         <div className="pa5">
//             <form onSubmit={handleSubmit((newCard) => setNewCard(JSON.stringify(newCard)))} style={{textAlign: 'left', margin: 'auto', width: '100%', maxWidth: '800px'}}>
//                 <div className="input-wrapper">
//                     <input {...register("name", {required: true})} className="input-field" />
//                     <span className="input-label">Name of Object:</span>
//                     <span className="input-shadow"></span>
//                 </div>
//                 <div className="input-wrapper">
//                     <input {...register("brand")} className="input-field" />
//                     <span className="input-label">Brand:</span>
//                     <span className="input-shadow"></span>
//                 </div>
//                 <div className="input-wrapper">
//                     <input {...register("color")} className="input-field" />
//                     <span className="input-label">Color:</span>
//                     <span className="input-shadow"></span>
//                 </div>
//                 <div className="input-wrapper">
//                     <input {...register("location")} className="input-field" />
//                     <span className="input-label">Location when found:</span>
//                     <span className="input-shadow"></span>
//                 </div>
//                 <div className="input-wrapper">
//                     <input {...register("time")} type="datetime-local" className="input-field" placeholder="mm/dd/yyyy, --:-- --" />
//                     <span className="input-label">Time when found:</span>
//                     <span className="input-shadow"></span>
//                 </div>
//                 <div className="input-wrapper">
//                     <input {...register("founderName", {required: true})} className="input-field" />
//                     <span className="input-label">Founder's Name:</span>
//                     <span className="input-shadow"></span>
//                 </div>
//                 <div className="input-wrapper">
//                     <input {...register("founderContact", {required: true})} className="input-field" />
//                     <span className="input-label">Founder's Contact Information:</span>
//                     <span className="input-shadow"></span>
//                 </div>
//                 <div className="input-wrapper">
//                     <input {...register("image")} type="file" accept="image/*" className="input-field" placeholder="Browse... No file selected."/>
//                     <span className="input-label">Image of the Object:</span>
//                     <span className="input-shadow"></span>
//                 </div>
//                 <p>{console.log(newCard)}</p>
//                 <button type="submit" className="button-52">Create new item</button>
//             </form>
//         </div>
//     );
// }


// export default ListItem; 


