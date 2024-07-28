import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const getUser = async () => {
        try {
            const response = await axios.get("/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    const getUserItems = async () => {
        try {
            const response = await axios.get("/items/getAllMyItems", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching user items", error);
        }
    };

    const changePassword = async () => {
        const newPassword = prompt("Enter your new password:");
        if (!newPassword) return;

        try {
            await axios.post("/profile/changePassword", { password: newPassword }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Password changed successfully");
        } catch (error) {
            console.error("Error changing password", error);
        }
    };

    const modifyItem = async (itemId) => {
        // Prompt for new item details (simplified for this example)
        const newTitle = prompt("Enter new title:");
        if (!newTitle) return;

        try {
            const response = await axios.put("/items/modifyItem", { _id: itemId, title: newTitle }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems(items.map(item => (item._id === itemId ? response.data : item)));
        } catch (error) {
            console.error("Error modifying item", error);
        }
    };

    const deleteItem = async (itemId) => {
        try {
            await axios.delete(`/items/deleteItem/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems(items.filter(item => item._id !== itemId));
        } catch (error) {
            console.error("Error deleting item", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getUser();
            await getUserItems();
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Error loading user data</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <h3>Username: {user.username}</h3>
            <button onClick={changePassword}>Change Password</button>
            <h2>My Items</h2>
            <div>
                {items.map(item => (
                    <div key={item._id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <button onClick={() => modifyItem(item._id)}>Modify</button>
                        <button onClick={() => deleteItem(item._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;

