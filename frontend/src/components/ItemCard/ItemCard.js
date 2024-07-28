// import React from "react";

// const ItemCard = ({ name, brand, color, location, time, founder, contactInfo, image, category }) => {
//     return (
//       <div className="tc dib br3 pa3 ma2 grow bw2 shadow-5" style={{ textAlign: 'left', backgroundColor: '#f5f5dc' }}>
//         <img alt="lost item" src={image} height={'300'} width={'25%'} style={{}}/>
//         <p>Name: {name}</p>
//         <p>Brand: {brand}</p>
//         <p>Color: {color}</p>
//         <p>Location when found: {location}</p>
//         <p>Time when found: {time}</p>
//         <p>Founder's name: {founder}</p>
//         <p>Founder's contact info: {contactInfo}</p>
//         <p>Category: {category}</p>
//       </div>
//     );
//   }

// export default ItemCard;


import React, { useState } from "react";
import './ItemCard.css';

const ItemCard = ({ name, brand, color, location, time, founder, contactInfo, image, category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStyle, setModalStyle] = useState({});
  const [initialStyle, setInitialStyle] = useState({});
  
  const handleCardClick = (e) => {
    const rect = e.target.closest('.item-card').getBoundingClientRect();
    setInitialStyle({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setModalStyle({
      top: '50%',
      left: '50%',
      width: '60%',
      height: 'auto',
      transform: 'translate(-50%, -50%)',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="item-card" onClick={handleCardClick}>
        <img alt="lost item" src={image} className="item-image" />
        <div className="item-summary">
          <p className="item-name"><strong>Name:</strong> {name}</p>
          <p className="item-brand"><strong>Brand:</strong> {brand}</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div
            className="modal"
            style={isModalOpen ? modalStyle : initialStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <img alt="lost item" src={image} className="modal-image" />
            <div className="modal-details">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Brand:</strong> {brand}</p>
              <p><strong>Color:</strong> {color}</p>
              <p><strong>Location when found:</strong> {location}</p>
              <p><strong>Time when found:</strong> {new Date(time).toLocaleString()}</p>
              <p><strong>Founder's name:</strong> {founder}</p>
              <p><strong>Founder's contact info:</strong> {contactInfo}</p>
              <p><strong>Category:</strong> {category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemCard;










