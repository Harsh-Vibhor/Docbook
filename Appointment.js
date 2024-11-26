import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Appointment.css"; // Add styling for appointments

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Replace the URL with your API endpoint that returns appointments
                const response = await fetch("http://localhost/docbook-api/get_appointments.php");
                const data = await response.json();

                if (data) {
                    setAppointments(data);
                } else {
                    setError("No appointments found.");
                }
                setLoading(false);
            } catch (error) {
                setError("Error fetching appointments: " + error.message);
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) {
        return <p>Loading appointments...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="appointments-container">
            <Navbar />
            <h2>Your Appointments</h2>
            <div className="appointments-list">
                {appointments.length === 0 ? (
                    <p>No appointments booked yet.</p>
                ) : (
                    appointments.map((appointment) => (
                        <div key={appointment.id} className="appointment-card">
                            <p><strong>Doctor:</strong> {appointment.doctor_name}</p>
                            <p><strong>Specialty:</strong> {appointment.specialty}</p>
                            <p><strong>Appointment Date:</strong> {appointment.date}</p>
                            <p><strong>Status:</strong> {appointment.status}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Appointment;
