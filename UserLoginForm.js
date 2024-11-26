import React, { useState } from "react";
import './styles.css'; // Import your CSS file

const UserLoginForm = ({ onSwitchToSignup, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost/docbook-api/login_signup.php/login', {
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
                alert(data.error); // Show the error message
            } else {
                onLoginSuccess(); // Call the prop to indicate a successful login
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert('Login failed. Please try again.'); // Handle network errors
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <div className="signup-link">
                    <p>Don't have an account? <a href="#" onClick={onSwitchToSignup}>Sign Up</a></p>
                </div>
            </form>
        </div>
    );
};

export default UserLoginForm;
