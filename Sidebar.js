// Sidebar.js
import React from "react";
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h3>Specialties</h3>
            <ul>
                <li>All Doctors</li>
                <li>General Physician</li>
                <li>Gynecologist</li>
                <li>Dermatologist</li>
                <li>Pediatricians</li>
                <li>Neurologist</li>
            </ul>
        </div>
    );
};

export default Sidebar;
