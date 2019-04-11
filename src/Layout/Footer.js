import React from 'react'

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <footer className="container-fluid pt-5 border-top">
            <div className="text-center">
                <p>&copy; {currentYear} Patrice B.</p>
            </div>
        </footer>
    );
};

export default Footer;