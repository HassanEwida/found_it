import React from "react";

// const ItemCard = ({ name, brand, color, location, time, founderName, founderContact, image }) => {
//     return(
//             <div className="tc dib br3 pa3 ma2 grow bw2 shadow-5" style={{textAlign: 'left', backgroundColor: '#f5f5dc'}}>
//                 <img alt="lost item" src={image}/>
//                 <p>Name: {name}</p>
//                 <p>Brand: {brand}</p>
//                 <p>Color: {color}</p>
//                 <p>Location when found: {location}</p>
//                 <p>Time when found: {time}</p>
//                 <p>Founder's name: {founderName}</p>
//                 <p>Founder's contact info: {founderContact}</p>
//                 <p></p>
                
//             </div>   
//     );
// }
const ItemCard = ({ name, brand, color, location, time, founderName, founderContact, image, category }) => {
    return (
      <div className="tc dib br3 pa3 ma2 grow bw2 shadow-5" style={{ textAlign: 'left', backgroundColor: '#f5f5dc' }}>
        <img alt="lost item" src={image} />
        <p>Name: {name}</p>
        <p>Brand: {brand}</p>
        <p>Color: {color}</p>
        <p>Location when found: {location}</p>
        <p>Time when found: {time}</p>
        <p>Founder's name: {founderName}</p>
        <p>Founder's contact info: {founderContact}</p>
        <p>Category: {category}</p>
      </div>
    );
  }

export default ItemCard;