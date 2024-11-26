import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './styles.css';

const AdminLoginForm = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleAdminLogin = async (event) => {
        event.preventDefault();
        setErrorMessage(''); // Reset any previous error messages

        try {
            const response = await fetch('http://localhost/docbook-api/admin.php/admin_login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (data.error) {
                // Show the error message if the backend returns an error
                setErrorMessage(data.error);
            } else {
                // Call the onLoginSuccess prop if login is successful
                onLoginSuccess();
                navigate('/admin-panel'); // Redirect to AdminPanel page
            }
        } catch (error) {
            console.error("Error during admin login:", error);
            setErrorMessage('Admin login failed. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2>Admin Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleAdminLogin}>
                <label>Username</label>
                <input 
                    type="text" 
                    placeholder="Enter your username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <label>Password</label>
                <input 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLoginForm;
