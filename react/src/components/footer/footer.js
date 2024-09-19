import React from 'react';
import { Link } from 'react-router-dom';
// import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-left">
        Copyright &copy; {currentYear}. All Rights Reserved.      </div>
      <div className="footer-right">
      </div>
    </footer>
  );
}

export default Footer;
