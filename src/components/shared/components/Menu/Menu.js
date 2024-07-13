import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames'; // For conditional classnames
import classes from './Menu.module.scss';

const Menu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateTo = (path) => {
        navigate(path);
    };

    useEffect(() => {
        // Optional: You can add any logic here that needs to run when location changes
    }, [location]);

    // Define navigation items array
    const navItems = [
        { path: '/category', label: 'Category' },
        { path: '/quotes', label: 'Quotes' },
        { path: '/template-upload', label: 'Templates' },
        { path: '/template-selection', label: 'Templates Selection' },
    ];

    return (
        <div className={classes.sidebar}>
            <Nav defaultActiveKey="/home" className="flex-column">
                {navItems.map((item, index) => (
                    <Nav.Link
                        key={index}
                        onClick={() => navigateTo(item.path)}
                        className={classNames(classes.navLink, {
                            [classes.active]: location.pathname === item.path,
                        })}
                    >
                        <span className={classes.navLinkText}>{item.label}</span>
                        {location.pathname === item.path && <span className={classes.activeStrip} />}
                    </Nav.Link>
                ))}
            </Nav>
        </div>
    );
}

export default Menu;
