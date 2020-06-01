import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from '@reach/router';

export default function MobileMenu({ loggedInUser, handleSignOut }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <div id="NavBar__mobile">
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <i className="fas fa-hamburger" id="NavBar__icon"></i>
            </Button>
            <Menu
                id="mobile-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><Link to="/" className="NavBar__mobile__item">Home</Link></MenuItem>
                <MenuItem onClick={handleClose} ><Link to="/register-business" className="NavBar__mobile__item">
                    Register Business
          </Link></MenuItem>
                {loggedInUser === "Admin" && (
                    <MenuItem >
                        <Link to="/verify" className="NavBar__mobile__item">
                            Verify
            </Link></MenuItem>
                )}
                <MenuItem onClick={(event) => {
                    handleClose();
                    handleSignOut(event);
                }} ><Link to="/" className="NavBar__mobile__item">Sign Out</Link></MenuItem>
            </Menu>
        </div>
    );
}