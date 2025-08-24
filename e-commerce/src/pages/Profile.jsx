import { useState, useEffect } from "react";
import axios from "axios";
import "./Simple.css";

const Profile = () => {
    const [formData, setFormData] = useState({ id: "", userName: "", email: "", address: "", phone: "", password: "" });

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setFormData({
                    id: parsedUser.id || "",
                    userName: parsedUser.userName || "",
                    email: parsedUser.email || "",
                    address: parsedUser.address || "",
                    phone: parsedUser.phone || "",
                    password: "",
                });
            } else {
                console.error("No user found in localStorage");
            }
        } catch (err) {
            console.error("Invalid user in localStorage", err);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        if (!formData.id) {
            console.error("User ID missing");
            return;
        }

        try {
            const updatePayload = {};
            if (formData.userName) updatePayload.userName = formData.userName;
            if (formData.email) updatePayload.email = formData.email;
            if (formData.address) updatePayload.address = formData.address;
            if (formData.phone) updatePayload.phone = formData.phone;
            if (formData.password) updatePayload.password = formData.password;

            const response = await axios.put(`http://localhost:5001/users/${formData.id}`, updatePayload);
            console.log("User updated:", response.data);

            const updatedUser = response.data;
            localStorage.setItem("user", JSON.stringify(updatedUser));

            setFormData({
                id: updatedUser.id,
                userName: updatedUser.userName || "",
                email: updatedUser.email || "",
                address: updatedUser.address || "",
                phone: updatedUser.phone || "",
                password: "", 
            });

            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Error updating user:", err);
            alert("Error updating profile. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Profile</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input
                        type="text"
                        name="userName"
                        placeholder="Name"
                        value={formData.userName}
                        onChange={handleChange}
                    />
                </div>
                <div className="input">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="input">
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="input">
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="input">
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="submit-container">
                    <div className="submit" onClick={handleUpdate}>
                        Update
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;