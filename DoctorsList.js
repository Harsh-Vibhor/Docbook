// DoctorsList.js
import React, { useEffect, useState } from "react";
import "./AdminPanel.css"; // Use the same CSS file for styling

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        // Fetch the list of doctors from the API
        const fetchDoctors = async () => {
            try {
                const response = await fetch("http://localhost/docbook-api/get_doctors.php");
                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div className="doctors-list">
            {doctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                    <img src={doctor.photo_url} alt={doctor.name} className="doctor-photo" />
                    <h4>{doctor.name}</h4>
                    <p>Specialty: {doctor.specialty}</p>
                    <p>Availability: {doctor.availability}</p>
                    <p>Location: {doctor.location}</p>
                </div>
            ))}
        </div>
    );
};

export default DoctorsList;
