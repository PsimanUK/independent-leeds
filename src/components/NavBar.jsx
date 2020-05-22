import React from "react";
import { Link } from "@reach/router";

const NavBar = ({ loggedInUser }) => {
  return (
    <nav>
      <p>This Is Where The NavBar Goes...</p>
      <Link to="/">Home</Link>
      <br />
      <Link to="/register-business">Register Business</Link>
      {loggedInUser === "Admin" && <Link to="/verify">Verify businesses</Link>}
    </nav>
  );
};

export default NavBar;
