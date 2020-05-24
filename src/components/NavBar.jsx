import React from "react";
import { Link } from "@reach/router";

const NavBar = ({ loggedInUser }) => {
  return (
    <nav className="NavBar" >
      <Link className="NavBar__item" to="/">Home</Link>
      <br />
      <Link className="NavBar__item" to="/register-business">Register Business</Link>
      {loggedInUser === "Admin" && <Link to="/verify">Verify businesses</Link>}
    </nav>
  );
};

export default NavBar;
