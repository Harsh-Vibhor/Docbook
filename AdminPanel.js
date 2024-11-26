import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [doctors, setDoctors] = useState([]); // State to hold doctor data
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    setActiveLink(link);
    if (link === "Add Doctors") {
      navigate("/admin-panel/add-doctor"); // Route to AddDoctor page
    }
  };

  useEffect(() => {
    if (activeLink === "Doctors List") {
      // Fetch doctors data only when Doctors List is active
      const fetchDoctors = async () => {
        try {
          const response = await axios.get("http://localhost/docbook-api/get_doctors.php");
          console.log(response.data);  // Log the data to check if we receive the doctors
          setDoctors(response.data);   // Set doctors data to state
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      };
      fetchDoctors();
    }
  }, [activeLink]);

  return (
    <div className="admin-panel-container">
      <div className="sidebar">
        <h2>Docbook AdminPanel</h2>
        <ul>
          {["Dashboard", "Add Doctors", "Appointments", "Doctors List"].map((link) => (
            <li
              key={link}
              className={activeLink === link ? "active" : ""}
              onClick={() => handleLinkClick(link)}
            >
              {link}
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        <h2>{activeLink}</h2>
        {activeLink === "Dashboard" && (
          <p>Manage doctors, view appointments, and other admin tasks here.</p>
        )}
        {activeLink === "Doctors List" && (
          <div className="doctors-list">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <img
                    src={doctor.photo} // Use the image URL provided by the API
                    alt={doctor.name}
                    className="doctor-photo"
                  />
                  <div className="doctor-info">
                    <h4>{doctor.name}</h4>
                    <p><strong>Specialty:</strong> {doctor.specialty}</p>
                    <p><strong>Availability:</strong> {doctor.availability}</p>
                    <p><strong>Location:</strong> {doctor.location}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No doctors available. Please add doctors to see them listed here.</p>
            )}
          </div>
        )}
        {activeLink === "Appointments" && (
          <p>View and manage appointments here.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
