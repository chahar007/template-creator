import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

import classes from './Header.module.scss'

function Header() {



    return (
        <Navbar className={`${classes.header} h-100`} >
            <div className={classes.headerBody} >
                <Navbar.Brand className='text-white' href="#home">Template Creator</Navbar.Brand>
                <Nav className="ml-auto ">
                    <Nav.Link className='text-white' href="#logout">Logout</Nav.Link>
                </Nav>
            </div>
        </Navbar>
    );
}

export default Header;
