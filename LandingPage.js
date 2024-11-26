import React from 'react';
import Navbar from './Navbar';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Navbar />
            
            {/* Intro Block */}
            <div className="intro-block">
                <h2>Your Health, Our Priority</h2>
                <p>"A healthy outside starts from the inside."</p>
                <button className="appointment-button">Book Appointment</button>
            </div>

            {/* About Us Section */}
            <section className="about-us">
                <h2>About Docbook</h2>
                <p>
                    Docbook is a trusted platform that simplifies the process of booking medical appointments. 
                    We connect patients with qualified healthcare professionals through our easy-to-use online interface. 
                    Whether it's a routine check-up or specialized care, Docbook provides the convenience and flexibility you need.
                </p>
            </section>

            {/* Services Section */}
            <section className="services-section">
                <h2>Our Services</h2>
                <div className="services">
                    <div className="service-card">
                        <h3>Book Appointment</h3>
                        <p>Quick and easy booking for doctor appointments.</p>
                    </div>
                    <div className="service-card">
                        <h3>Consult Top Doctors</h3>
                        <p>Access a network of qualified and trusted doctors.</p>
                    </div>
                    <div className="service-card">
                        <h3>24/7 Assistance</h3>
                        <p>Get support any time you need it.</p>
                    </div>
                </div>
            </section>

            {/* Steps to Book an Appointment Section */}
            <section className="appointment-steps">
                <h2>Discover the Online Appointment!</h2>
                <div className="steps">
                    <div className="step-card">
                        <h3>Step 1</h3>
                        <p>Register or Log in to your account.</p>
                    </div>
                    <div className="step-card">
                        <h3>Step 2</h3>
                        <p>Search for doctors by specialty or location.</p>
                    </div>
                    <div className="step-card">
                        <h3>Step 3</h3>
                        <p>Pick a convenient time and confirm the appointment.</p>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 Docbook. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
