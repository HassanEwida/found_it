import React from "react";
import { Link } from "react-router-dom";



const Home = () => {
    return(
        <div>
            <h1 style={{fontSize: 'clamp(8rem, 2.5vw, 12rem)'}}>Welcome!</h1>
            <p className="f3">
              If you lost anything in the past few days, you'll find ity here, help yourselef and click below on the `Search` button.  
            </p>
            <p className="f3">
                And if you found somthing that doesn't belong to you or anyone you know, you can list it here until the owner contacts you.
            </p>
            <p className="f3"><b>
                To do so, please click on the `List an Item` button.
            </b></p>
            <Link to="/SearchItem">
                <button className="button-52" style={{marginRight: 25, fontSize: '50px'}}>Search</button>
            </Link>
            <Link to="/ListItem">
                <button className="button-52" style={{marginLeft: 25, fontSize: '50px'}}>List an Item</button>
            </Link>     
        </div>
    );
}

export default Home;