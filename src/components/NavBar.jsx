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

    const SignOutButton = styled(Button)({ textTransform: 'none', textDecoration: 'none', color: 'white', fontSize: '1em' })

    return (
      <nav className="NavBar">
        <Link className="NavBar__title" to="/">
          Independent Leeds
        </Link>
        <section>
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
