import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "@reach/router";
import { Button } from '@material-ui/core';
import { styled } from "@material-ui/styles";

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
  }

  displayNavMenu = () => {
    const element = document.getElementById("navMenu");
    if (element.className === "navMenu") {
      element.className += " responsive";
    } else {
      element.className = "navMenu";
    }
  };

  // displayNavMenu = (event) => {
  //   event.preventDefault();
  //   const navMenu = document.getElementById('navMenu');
  //   console.log(navMenu.style.display, '<-- navMenus display style')
  //   if (navMenu.style.display === 'block') {
  //     navMenu.style.display = 'none';
  //   } else {
  //     navMenu.style.display = 'block';
  //   }
  // };

  render() {
    const { loggedInUser } = this.props;

    const SignOutButton = styled(Button)({ textTransform: 'none', textDecoration: 'none', color: 'white', fontSize: '1em' })

    return (
      <nav className="NavBar">
        <Link className="NavBar__title" to="/">
          Independent Leeds
        </Link>
        <section >
          <Link className="NavBar__item" to="/register-business">
            Register Business
          </Link>
          {loggedInUser === "Admin" && (
            <Link to="/verify" className="NavBar__item">
              Verify Businesses
            </Link>
          )}
          <SignOutButton onClick={this.handleSignOut} className="signOutButton"><Link to="/" className="NavBar__item" >Sign Out</Link></SignOutButton>
        </section>
        <Link
          to=""
          className="NavBar__icon"
          onClick={this.displayNavMenu}
        >
          <i class="fas fa-hamburger" ></i>
        </Link>
        <section id="navMenu" className="navMenu">
          <p>Home</p>
          <p>Register Business</p>
          <p>Verify Business</p>
          <p>Sign Out</p>
        </section>
      </nav>
    );
  }
}

export default NavBar;
