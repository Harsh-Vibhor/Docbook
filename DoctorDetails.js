import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DoctorDetails.css";
import Navbar from "./Navbar";

const DoctorDetails = () => {
    const { id } = useParams(); // Get the doctor ID from the URL params
    const [doctor, setDoctor] = useState(null); // Store doctor data
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error state
    const [appointmentMessage, setAppointmentMessage] = useState(""); // For success message

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await fetch(`http://localhost/docbook-api/get_doctors.php`);
                const data = await response.json();
    
                const doctorId = parseInt(id, 10);
                const foundDoctor = data.find(doctor => parseInt(doctor.id, 10) === doctorId);
    
                if (foundDoctor) {
                    setDoctor(foundDoctor);
                } else {
                    setError("Doctor not found.");
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
    
        fetchDoctorDetails();
    }, [id]);

    const handleBookAppointment = () => {
        // Simulate appointment booking process (you can replace it with actual logic)
        setAppointmentMessage("Appointment Booked Successfully!");

        // Hide the message after 3 seconds
        setTimeout(() => {
            setAppointmentMessage("");
        }, 3000);
    };

    if (loading) {
        return <p>Loading doctor details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="doctor-details-container">
            <Navbar />
            {doctor && (
                <>
                    <div className="doctor-details-content">
                        <div className="doctor-photo-wrapper">
                            <img src={doctor.photo} alt={doctor.name} className="doctor-photo-large" />
                        </div>
                        <div className="doctor-info">
                            <h3>{doctor.name}</h3> {/* The name appears only here */}
                            <p><strong>Specialty:</strong> {doctor.specialty}</p>
                            <p><strong>Availability:</strong> {doctor.availability}</p>
                            <p><strong>Location:</strong> {doctor.location}</p>
                            <p><strong>Experience:</strong> {doctor.experience} years</p>
                            <p><strong>Booking Charge:</strong> Rs 500</p>
                            <button className="book-appointment-button" onClick={handleBookAppointment}>
                                Book Appointment
                            </button>

                            {/* Display success message */}
                            {appointmentMessage && (
                                <div className="appointment-message">{appointmentMessage}</div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DoctorDetails;
