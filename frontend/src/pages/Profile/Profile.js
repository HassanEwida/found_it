// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { AppContext } from '../../app-context';
// import './Profile.css';

// const Profile = () => {
//   const navigate = useNavigate();
//   const { state, setState } = useContext(AppContext);
//   const [userItems, setUserItems] = useState([]);
//   const [newPassword, setNewPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (state) {
//       if (state?.token) {
//         fetchUserItems();
//       } else {
//         navigate('/login');
//       }
//     }
//   }, [state, navigate]);

//   const fetchUserItems = async () => {
//     try {
//       const response = await axios.get('http://localhost:3001/items/getAllMyItems', {
//         headers: {
//           "Authorization": "Bearer " + state.token
//         }
//       });
//       setUserItems(response.data);
//       setIsLoading(false);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         alert('Unauthorized');
//         navigate('/login');
//       } else {
//         console.error('Error fetching items:', err);
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleChangePassword = async () => {
//     if (newPassword.length < 12) {
//       alert('Password must be at least 12 characters long');
//       return;
//     }
//     try {
//       await axios.post('http://localhost:3001/profile/changePassword', 
//         { password: newPassword },
//         { headers: { "Authorization": "Bearer " + state.token } }
//       );
//       alert('Password changed successfully');
//       setNewPassword('');
//     } catch (err) {
//       if (err.response?.status === 401) {
//         alert('Unauthorized');
//         navigate('/login');
//       } else {
//         alert('Failed to change password');
//       }
//     }
//   };

//   const handleModifyItem = async (item) => {
//     // Implement item modification logic
//     console.log('Modify item:', item);
//   };

//   const handleDeleteItem = async (itemId) => {
//     try {
//       await axios.delete(`http://localhost:3001/items/deleteItem/${itemId}`, {
//         headers: { "Authorization": "Bearer " + state.token }
//       });
//       fetchUserItems(); // Refresh the list after deletion
//     } catch (err) {
//       if (err.response?.status === 401) {
//         alert('Unauthorized');
//         navigate('/login');
//       } else {
//         alert('Failed to delete item');
//       }
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="profile-page">
//       <h1>Welcome, {state?.user?.username}</h1>
//       <h3>Please insert the new password you wish to change for(at least 12 characters):</h3>
//       <div style={{display: "flex", marginLeft: "50px", marginRight: "50px"}}>
//         <div className="input-wrapper">
//             <input 
//                 className='input-field'
//                 type="password" 
//                 value={newPassword} 
//                 onChange={(e) => setNewPassword(e.target.value)}
//             />
//             <span className="input-label">New Password</span>
//             <span className="input-shadow"></span>
//         </div>
//         <button className="button-52" style={{height:'42px'}}>
//             <FontAwesomeIcon icon={faFingerprint} />
//             <span style={{ marginLeft: '10px' }}>Change Password</span>
//         </button>
//         </div>
 

//       <h2>Your Items</h2>
//       <div className="item-list">
//       {userItems.length > 0 ? (
//         <div className="item-list">
//             {userItems.map(item => (
//             <div key={item._id} className="item-card">
//                 <img alt="lost item" src={item.image} className="item-image" />
//                 <div className="item-summary">
//                 <p><strong>Name:</strong> {item.name}</p>
//                 <p><strong>Brand:</strong> {item.brand}</p>
//                 <p><strong>Color:</strong> {item.color}</p>
//                 <p><strong>Location when found:</strong> {item.location}</p>
//                 <p><strong>Time when found:</strong> {new Date(item.time).toLocaleString()}</p>
//                 <p><strong>Founder's name:</strong> {item.founder}</p>
//                 <p><strong>Founder's contact info:</strong> {item.contactInfo}</p>
//                 <p><strong>Category:</strong> {item.category}</p>
//                 </div>
//                 <button onClick={() => handleModifyItem(item)}>Modify</button>
//                 <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
//             </div>
//             ))}
//         </div>
//         ) : (
//         <p>No items found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { AppContext } from '../../app-context';
import EditItemModal from '../../components/EditItemModal/EditItemModal'; // Import the modal component
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const [userItems, setUserItems] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    if (state?.token) {
      fetchUserItems();
    } else {
      navigate('/login');
    }
  }, [state, navigate]);

  const fetchUserItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/items/getAllMyItems', {
        headers: { "Authorization": `Bearer ${state.token}` }
      });
      setUserItems(response.data);
      setIsLoading(false);
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Unauthorized');
        navigate('/login');
      } else {
        console.error('Error fetching items:', err);
        setIsLoading(false);
      }
    }
  };

  const handleModifyItem = (item) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3001/items/deleteItem/${itemId}`, {
        headers: { "Authorization": `Bearer ${state.token}` }
      });
      fetchUserItems();
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Unauthorized');
        navigate('/login');
      } else {
        alert('Failed to delete item');
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h1>Welcome, {state?.user?.username}</h1>
      <h3>Please insert the new password you wish to change for (at least 12 characters):</h3>
      <div style={{display: "flex", marginLeft: "50px", marginRight: "50px"}}>
        <div className="input-wrapper">
          <input
            className='input-field'
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span className="input-label">New Password</span>
          <span className="input-shadow"></span>
        </div>
        <button className="button-52" style={{height:'42px'}}>
          <FontAwesomeIcon icon={faFingerprint} />
          <span style={{ marginLeft: '10px' }}>Change Password</span>
        </button>
      </div>

      <h2>Your Items</h2>
      <div className="item-list">
        {userItems.length > 0 ? (
          userItems.map(item => (
            <div key={item._id} className="item-card">
              <img alt="lost item" src={item.image} className="item-image" />
              <div className="item-summary">
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Brand:</strong> {item.brand}</p>
                <p><strong>Color:</strong> {item.color}</p>
                <p><strong>Location when found:</strong> {item.location}</p>
                <p><strong>Time when found:</strong> {new Date(item.time).toLocaleString()}</p>
                <p><strong>Founder's name:</strong> {item.founder}</p>
                <p><strong>Founder's contact info:</strong> {item.contactInfo}</p>
                <p><strong>Category:</strong> {item.category}</p>
              </div>
              <button onClick={() => handleModifyItem(item)}>Modify</button>
              <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>

      {isEditModalOpen && (
        <EditItemModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          item={currentItem}
          token={state.token}
          onSave={fetchUserItems}
        />
      )}
    </div>
  );
};

export default Profile;




