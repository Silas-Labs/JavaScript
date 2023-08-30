import React from "react";

const Footer = () => {
  const date = new Date();
  return (
    <footer className="footer">CopyRight &copy;{date.getFullYear()}</footer>
  );
};

export default Footer;
