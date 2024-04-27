import React from "react";

const ItemCard = ({ name, brand, color, location, time, founderName, founderContact, image }) => {
    return(
            <div class="tc dib br3 pa3 ma2 grow bw2 shadow-5" style={{textAlign: 'left', backgroundColor: '#f5f5dc'}}>
                <img src={image}/>
                <p>Name: {name}</p>
                <p>Brand: {brand}</p>
                <p>Color: {color}</p>
                <p>Location when found: {location}</p>
                <p>Time when found: {time}</p>
                <p>Founder's name: {founderName}</p>
                <p>Founder's contact info: {founderContact}</p>
                <p></p>
                
            </div>   
    );
}

export default ItemCard;


// {
//     name: "Smartphone",
//     brand: "Samsung",
//     color: "Black",
//     location: "Central Park, New York",
//     time: "2023-06-10T14:30:00Z",
//     founderName: "John Doe",
//     founderContact: "johndoe@example.com",
//     image: "https://example.com/images/smartphone.jpg"
//   },