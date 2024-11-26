import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import UserLoginForm from "./components/UserLoginForm";
import UserSignupForm from "./components/UserSignupForm";
import AdminLoginForm from "./components/AdminLoginForm";
import LandingPage from "./components/LandingPage";
import AdminPanel from "./components/AdminPanel";
import AddDoctor from "./components/AddDoctor";
import About from "./components/About";
import Navbar from "./components/Navbar";
import AllDoctors from "./components/AllDoctors";
import DoctorDetails from "./components/DoctorDetails"; // Import DoctorDetails component
import Appointment from "./components/Appointment"; // Import Appointment component

const MainApp = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state
    const [isAdmin, setIsAdmin] = useState(false); // Track admin login state

    const handleSwitchToSignup = () => {
        setIsLoginForm(false);
    };

    const handleSwitchToLogin = () => {
        setIsLoginForm(true);
    };

    const handleLoginSuccess = (role) => {
        setIsLoggedIn(true); // Update login state
        if (role === "admin") {
            setIsAdmin(true); // Set admin login state
        }
    };

    // Get the current location to check the path
    const location = useLocation();

    return (
        <>
            {/* Render Navbar only if logged in and not on the admin panel page */}
            {isLoggedIn &&
                location.pathname !== "/admin-panel" &&
                location.pathname !== "/admin-panel/add-doctor" && (
                    <Navbar isAdmin={isAdmin} />
                )}

            <Routes>
                {/* Route for User and Admin Login */}
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <LandingPage /> // Show LandingPage if logged in
                        ) : isLoginForm ? (
                            <UserLoginForm
                                onSwitchToSignup={handleSwitchToSignup}
                                onLoginSuccess={() => handleLoginSuccess("user")} // User login success
                            />
                        ) : (
                            <UserSignupForm onSwitchToLogin={handleSwitchToLogin} />
                        )
                    }
                />
                {/* Admin Login Route */}
                <Route
                    path="/admin-login"
                    element={
                        <AdminLoginForm onLoginSuccess={() => handleLoginSuccess("admin")} />
                    }
                />
                {/* Admin Panel Route */}
                <Route path="/admin-panel" element={<AdminPanel />} />
                {/* Landing Page Route */}
                <Route path="/landing-page" element={<LandingPage />} />
                {/* ABout Route */}
                <Route path="/about" element={<About />} />
                {/* Add Doctor Route */}
                <Route path="/admin-panel/add-doctor" element={<AddDoctor />} />
                {/* Route for All Doctors */}
                <Route
                    path="/all-doctors"
                    element={<AllDoctors />} // AllDoctors page route
                />
                {/* Doctor Details Route */}
                <Route
                    path="/doctor-details/:id"
                    element={<DoctorDetails />} // DoctorDetails page route
                />
                {/* Route for Appointments */}
                <Route
                    path="/appointments"
                    element={<Appointment />} // Appointments page route
                />
                {/* Route for the About Page */}
                {isLoggedIn && <Route path="/about" element={<About />} />}
            </Routes>
        </>
    );
};

const App = () => (
    <Router>
        <MainApp />
    </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));
