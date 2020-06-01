import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "@reach/router";

class NavBar extends Component {
  state = {
    error: "",
  };

  handleSignOut = (event) => {
    event.preventDefault();
    Auth.signOut().catch((err) => {
      this.setState({ error: err.code });
    });
  };

  handleDisplayMenu = (event) => {
    event.preventDefault();
    console.log("menu click");
    const hamburger = document.getElementById('hamburgerList')
  }

  // toggleNavClass = () => {
  //   const element = document.getElementById("nav");
  //   if (element.className === "nav") {
  //     element.className += " responsive";
  //   } else {
  //     element.className = "nav";
  //   }
  // };

  render() {
    const { loggedInUser } = this.props;
    return (
      <nav className="NavBar">
        <Link className="NavBar__title" to="/">
          Independent Leeds
        </Link>
        <section>
          <Link className="NavBar__item" to="/register-business">
            Register business
          </Link>
          {loggedInUser === "Admin" && (
            <Link to="/verify" className="NavBar__item">
              Verify businesses
            </Link>
          )}
          <Link to="/" onClick={this.handleSignOut} className="NavBar__item">Sign out</Link>
        </section>
        <Link
          to=""
          className="menu"
          onClick={this.handleDisplayMenu}
        >
          <i class="fas fa-hamburger"></i>
        </Link>
      </nav>
    );
  }
}

export default NavBar;
