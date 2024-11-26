import React from 'react';
import './About.css';
import exampleImage from './about_image.png';

const About = () => {
    return (
        <div className="about-page">
            <div className="about-content">
            <h1>About Docbook</h1>
            <p>
                Docbook is a trusted platform that simplifies the process of booking medical appointments. 
                We connect patients with qualified healthcare professionals through our easy-to-use online interface. 
                Whether it's a routine check-up or specialized care, Docbook provides the convenience and flexibility you need.
            </p>
            <img src={exampleImage} alt="About us" className="about-image" />
            </div>
        </div>
    );
};

export default About;
