// src/pages/ContactUs.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ContactUs.css'; // Create a CSS file for styling

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.message) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Submit the form data (add your submission logic here)
            alert('Form submitted successfully!');
            // Reset the form data
            setFormData({ name: '', email: '', message: '' });
            // Redirect to home page
            navigate('/'); // Redirect to home
        }
    };

    return (
        <div className="contact-us">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
                {errors.name && <p className="error">{errors.name}</p>}
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} />
                {errors.email && <p className="error">{errors.email}</p>}
                <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} />
                {errors.message && <p className="error">{errors.message}</p>}
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default ContactUs;
