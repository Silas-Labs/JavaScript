import React from "react";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";

const Header = ({ title, width }) => {
  return (
    <header className="header">
      <h2>
        {title}
        <span id="icon">
          {width < 768 ? (
            <FaMobileAlt />
          ) : width < 992 ? (
            <FaTabletAlt />
          ) : (
            <FaLaptop />
          )}
        </span>
      </h2>
    </header>
  );
};

export default Header;
