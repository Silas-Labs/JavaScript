import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div>
      <h2>Post not found</h2>
      <p>Well that's disappointing!</p>
      <p>
        visit our <Link to="/">Homepage</Link>
      </p>
    </div>
  );
};

export default Missing;
