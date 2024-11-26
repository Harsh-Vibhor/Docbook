import React, { useState } from "react";
import axios from "axios";
import "./AddDoctor.css";

const AddDoctor = () => {
    // State to hold form data for the doctor's details
    const [doctorData, setDoctorData] = useState({
        name: "",
        specialty: "",
        availability: "",
        location: "",
    });

    // State to hold the uploaded image file
    const [image, setImage] = useState(null);

    // Handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle image file selection
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object to handle the POST request with file data
        const formData = new FormData();
        formData.append("name", doctorData.name);
        formData.append("specialty", doctorData.specialty);
        formData.append("availability", doctorData.availability);
        formData.append("location", doctorData.location);
        formData.append("photo", image); // Append the image file

        try {
            // Make the POST request to the backend
            const response = await axios.post("http://localhost/docbook-api/add_doctor.php", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Make sure it's set for file uploads
                },
            });

            // Handle success response from the backend
            console.log(response.data); // Log the response data (debugging)
            alert(response.data.message); // Show success message from backend
        } catch (error) {
            // Handle error response from the backend or network errors
            console.error("Error adding doctor:", error.response ? error.response.data : error.message);
            alert("Error adding doctor. Please try again.");
        }
    };

    return (
        <div className="add-doctor-container">
            <h2>Add Doctor</h2>
            <form onSubmit={handleSubmit}>
                {/* Doctor Name Input */}
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={doctorData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Specialty Input */}
                <div>
                    <label>Specialty:</label>
                    <input
                        type="text"
                        name="specialty"
                        value={doctorData.specialty}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Availability Input */}
                <div>
                    <label>Availability:</label>
                    <input
                        type="text"
                        name="availability"
                        value={doctorData.availability}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Location Input */}
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={doctorData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Image File Input */}
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit">Add Doctor</button>
            </form>
        </div>
    );
};

export default AddDoctor;
