import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./AllDoctors.css";
import Navbar from "./Navbar";

const AllDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSpecialty, setSelectedSpecialty] = useState("All Doctors");

    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        fetch("http://localhost/docbook-api/get_doctors.php")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setDoctors(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleSpecialtyClick = (specialty) => {
        setSelectedSpecialty(specialty);
    };

    const handleDoctorClick = (id) => {
        navigate(`/doctor-details/${id}`); // Navigate to the DoctorDetails page
    };

    const filteredDoctors =
        selectedSpecialty === "All Doctors"
            ? doctors
            : doctors.filter((doctor) => doctor.specialty === selectedSpecialty);

    return (
        <div className="all-doctors-container">
            <Navbar />
            <div className="sidebar">
                <h3>Specialties</h3>
                <ul>
                    {[
                        "All Doctors",
                        "General Physician",
                        "Gynecologist",
                        "Dermatologist",
                        "Pediatricians",
                        "Neurologist",
                    ].map((specialty) => (
                        <li
                            key={specialty}
                            className={selectedSpecialty === specialty ? "active" : ""}
                            onClick={() => handleSpecialtyClick(specialty)}
                        >
                            {specialty}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="content">
                <h2>{selectedSpecialty}</h2>
                {loading ? (
                    <p>Loading doctors...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div className="doctor-cards">
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doctor) => (
                                <div
                                    className="doctor-card"
                                    key={doctor.id}
                                    onClick={() => handleDoctorClick(doctor.id)} // Add click handler
                                    style={{ cursor: "pointer" }} // Indicate clickability
                                >
                                    {doctor.photo && (
                                        <img
                                            src={doctor.photo}
                                            alt={doctor.name}
                                            className="doctor-photo"
                                        />
                                    )}
                                    <div className="doctor-info">
                                        <h3>{doctor.name}</h3>
                                        <p>{doctor.specialty}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No doctors available for this specialty.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllDoctors;
