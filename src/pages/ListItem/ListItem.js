import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import './ListItem.css';

const ListItem = () => {
    const { register, handleSubmit } = useForm();
    const [ newCard, setNewCard ] = useState("");

    return (
        <div className="pa5">
            <form onSubmit={handleSubmit((newCard) => setNewCard(JSON.stringify(newCard)))} style={{textAlign: 'left', margin: 'auto', width: '100%', maxWidth: '800px'}}>
                <div className="input-wrapper">
                    <input {...register("name", {required: true})} className="input-field" />
                    <span className="input-label">Name of Object:</span>
                    <span className="input-shadow"></span>
                </div>
                <div className="input-wrapper">
                    <input {...register("brand")} className="input-field" />
                    <span className="input-label">Brand:</span>
                    <span className="input-shadow"></span>
                </div>
                <div className="input-wrapper">
                    <input {...register("color")} className="input-field" />
                    <span className="input-label">Color:</span>
                    <span className="input-shadow"></span>
                </div>
                <div className="input-wrapper">
                    <input {...register("location")} className="input-field" />
                    <span className="input-label">Location when found:</span>
                    <span className="input-shadow"></span>
                </div>
                <div className="input-wrapper">
                    <input {...register("time")} type="datetime-local" className="input-field" />
                    <span className="input-label">Time when found:</span>
                    <span className="input-shadow"></span>
                </div>
                <div className="input-wrapper">
                    <input {...register("founderName", {required: true})} className="input-field" />
                    <span className="input-label">Founder's Name:</span>
                    <span className="input-shadow"></span>
                </div>
                <div className="input-wrapper">
                    <input {...register("founderContact", {required: true})} className="input-field" />
                    <span className="input-label">Founder's Contact Information:</span>
                    <span className="input-shadow"></span>
                </div>
                <div className="input-wrapper">
                    <input {...register("image")} type="file" accept="image/*" className="input-field" />
                    <span className="input-label">Image of the Object:</span>
                    <span className="input-shadow"></span>
                </div>
                <p>{console.log(newCard)}</p>
                <button type="submit" className="button-52">Create new item</button>
            </form>
        </div>
    );
}

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


