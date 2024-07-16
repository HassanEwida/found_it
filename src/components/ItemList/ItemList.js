import React from "react";
import ItemCard from "../ItemCard/ItemCard";

const ItemList = ({ lost }) => {
    const CardComponent = lost.map((user, i) => {
        return <ItemCard 
        key={i} 
        name={lost[i].name} 
        brand={lost[i].brand} 
        color={lost[i].color}
        location={lost[i].location}
        time={lost[i].time}
        founderName={lost[i].founderName}
        founderContact={lost[i].founderContact}
        image={lost[i].image}
        category={lost[i].category}/>
    })
    return  (
        <div>
            {CardComponent}
        </div>
    );
}

export default ItemList;

