import React from "react";
import ItemCard from "../ItemCard/ItemCard";

const ItemList = ({ lost }) => {
    const CardComponent = lost?.map((user, i) => {
        return <ItemCard 
        key={i} 
        name={lost[i].name} 
        brand={lost[i].brand} 
        color={lost[i].color}
        location={lost[i].location}
        time={lost[i].time}
        founder={lost[i].founder}
        contactInfo={lost[i] .contactInfo}
        image={lost[i].image}
        category={lost[i].category}/>
    })
    return  (
        <div className="item-card-container">
            {CardComponent}
        </div>
    );
}

export default ItemList;

