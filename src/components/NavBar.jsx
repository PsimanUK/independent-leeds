import React from "react";
import { Link } from "@reach/router";

const NavBar = () => {
  return (
    <nav>
      <p>This Is Where The NavBar Goes...</p>
      <Link to="/register-business">Register Business</Link>
    </nav>
  );
};

export default NavBar;
