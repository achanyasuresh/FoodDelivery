import React from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './Footer.css';

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-left">
                    <h2>Food Delivery</h2>
                    <p>
                        High-quality food delivery services with a focus on freshness and customer satisfaction.
                    </p>
                    <div className='footer-social-icons'>
                        <FacebookOutlinedIcon data-testid="facebook-icon" />
                        <TwitterIcon data-testid="twitter-icon" />
                        <LinkedInIcon data-testid="linkedin-icon" />
                    </div>
                </div>
                <div className="footer-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+64 22622920</li>
                        <li>contact@foodie.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copyright 2024 @ Foodie - All rights reserved</p>
        </div>
    );
};

export default Footer;
