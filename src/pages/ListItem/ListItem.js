import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import './ListItem.css';

const ListItem = () => {
    const { register, handleSubmit } = useForm();
    const [ newCard, setNewCard ] = useState("");
    
    return(
        <div className="pa10 br3 ba dark-gray b--white-10 mv4 w-150 w-100-m w-100-l mw6 shadow-5 center b f3">
            <form  onSubmit={handleSubmit((newCard) => setNewCard(JSON.stringify(newCard)))}>
                <label>Name of Object:</label><br/> 
                <input {...register("name", {required: true})} placeholder="Name" /><br/>
                <label>Brand:</label><br/> 
                <input {...register("brand")} placeholder="Brand" /><br/>
                <label>Color:</label><br/> 
                <input {...register("color")} placeholder="Color" /><br/>
                <label>Location when found:</label><br/> 
                <input {...register("location")} placeholder="Location" /><br/>
                <label>Time when found:</label><br/> 
                <input {...register("time")} type="datetime-local" /><br/>
                <label>Founder's Name::</label><br/> 
                <input {...register("founderName", {required: true})} placeholder="Your Name" /><br/>
                <label>Founder's Contact Information:</label><br/> 
                <input {...register("founderContact", {required: true})} placeholder="Phone number/email" /><br/>
                <label>Image of the Object:</label><br/> 
                <input {...register("image")} type="file" accept="image/*" /><br/>
                <button type="submit" className="button-52" style={{marginTop: 20}}>Create new item</button>
            </form>
        </div>
    );
}


export default ListItem; 


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