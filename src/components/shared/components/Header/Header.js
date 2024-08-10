import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { APP_CONSTANTS } from '../../../../config/utils/AppContext';
import { useAuth } from '../../../../config/utils/AuthProvider';

import classes from './Header.module.scss'

function Header() {

    const navigate = useNavigate();
    const auth = useAuth();

    const logout = () => {
        // Save the response in localStorage
        localStorage.setItem("user", '');
        localStorage.setItem("jwt", '');
        localStorage.setItem("tokens", '');
        auth.setIsAuth(false);

        // Update the APP_CONSTANTS
        APP_CONSTANTS.user = null;
        APP_CONSTANTS.jwt = null;
        APP_CONSTANTS.token = null;

        // window.location.href = '/';
        navigate('');
    }



    return (
        <Navbar className={`${classes.header} h-100`} >
            <div className={classes.headerBody} >
                <Navbar.Brand className='text-white' href="#home">Template Creator</Navbar.Brand>
                <Nav className="ml-auto ">
                    <Nav.Link className='text-white' onClick={logout}>Logout</Nav.Link>
                </Nav>
            </div>
        </Navbar>
    );
}

export default Header;
