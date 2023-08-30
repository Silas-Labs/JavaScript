import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ search, setSearch }) => {
  return (
    <nav className="navbar">
      <input
        id="search"
        type="text"
        placeholder="Search Posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="navbar-link">
        <li className="navbar-li">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-li">
          <Link to="/posts">Posts</Link>
        </li>
        <li className="navbar-li">
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
