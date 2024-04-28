import React, { useState } from "react";
import { useForm } from 'react-hook-form';

const ListItem = () => {
    const { register, handleSubmit } = useForm();
    const [ data, setData ] = useState("");
    
    return(
        <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))} style={{textAlign: 'left'}}>
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
           <input {...register("image")} type="image" /><br/>
        </form>
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