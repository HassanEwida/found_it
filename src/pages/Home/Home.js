// import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass, faList } from '@fortawesome/free-solid-svg-icons';



// const Home = () => {
//     return(
//         <div>
//             <h1 style={{fontSize: 'clamp(8rem, 2.5vw, 12rem)'}}>Welcome!</h1>
//             <p className="f3">
//               If you lost anything in the past few days, you'll find ity here, help yourselef and click below on the `Search` button.  
//             </p>
//             <p className="f3">
//                 And if you found somthing that doesn't belong to you or anyone you know, you can list it here until the owner contacts you.
//             </p>
//             <p className="f3"><b>
//                 To do so, please click on the `List an Item` button.
//             </b></p>
//             <Link to="/SearchItem">
//                 <button className="button-52" style={{marginRight: 25, fontSize: '50px'}}>
//                 <FontAwesomeIcon icon={faMagnifyingGlass} />
//                 Search
//                 </button>
//             </Link>
//             <Link to="/ListItem">
//                 <button className="button-52" style={{marginLeft: 25, fontSize: '50px'}}>
//                 <FontAwesomeIcon icon={faList}/>
//                 List an Item
//                 </button>
//             </Link>     
//         </div>
//     );
// }

// export default Home;
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faList } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
    return (
        <div className="welcome-section">
            <h1 className="welcome-heading">Welcome to Found It!</h1>
            <p className="motto">The virtual lost & found, at your fingertips.</p>
            <p className="description">
                If you lost anything in the past few days, you'll find it here. Help yourself and click the "Search" button below.
            </p>
            <p className="description">
                If you found something that doesn't belong to you or anyone you know, you can list it here until the owner contacts you.
            </p>
            <p className="description">
                <b>To do so, please click on the "List an Item" button.</b>
            </p>
            <div className="button-container">
                <Link to="/SearchItem">
                    <button className="button-52" style={{ marginRight: 25, fontSize: '50px' }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} beat size="lg" />
                        <span className="button-text">Search</span>
                    </button>
                </Link>
                <Link to="/ListItem">
                    <button className="button-52" style={{ marginLeft: 25, fontSize: '50px' }}>
                        <FontAwesomeIcon icon={faList} beat size="lg" />
                        <span className="button-text">List an Item</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Home;