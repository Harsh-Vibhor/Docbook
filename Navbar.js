import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="app-name">Docbook</div>
                <div className="navbar-links">
                    <a href="/landing-page">HOME</a>
                    <a href="/all-doctors">ALL DOCTORS</a>
                    <a href="/about">ABOUT</a>
                    <a href="#appointments">APPOINTMENTS</a>
                    <a href="/admin-login">Admin Panel</a> 
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
