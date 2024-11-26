// UserSignupForm.js
import React, { useState } from "react";
import './styles.css'; // Import your CSS file

const UserSignupForm = ({ onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignup = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost/docbook-api/login_signup.php/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: username,
                password: password,
                email: email,
            }),
        });

        const data = await response.json();

        if (data.message === "User registered successfully") {
            setSuccessMessage(data.message);
            setErrorMessage(''); // Clear any previous error message
        } else {
            setErrorMessage(data.error);
            setSuccessMessage(''); // Clear any previous success message
        }
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <form onSubmit={handleSignup}>
                <label>Username</label>
                <input 
                    type="text" 
                    placeholder="Enter your username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <label>Email</label>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
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
                <button type="submit">Sign Up</button>
                <div className="signup-link">
                    <p>Already have an account? <a href="#" onClick={onSwitchToLogin}>Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default UserSignupForm;
