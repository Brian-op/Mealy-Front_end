import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <p>&copy; {new Date().getFullYear()} Mealy. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
