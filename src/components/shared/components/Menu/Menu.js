import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import classes from './Menu.module.scss';

const Menu = ({ isSidebarOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [expandedGroup, setExpandedGroup] = useState(null);

    const navigateTo = (path, type) => {
        navigate(path);
        if (type === 'single') {
            setExpandedGroup(null);
        }
    };

    const toggleExpand = (groupLabel) => {
        setExpandedGroup(expandedGroup === groupLabel ? null : groupLabel);
    };

    useEffect(() => {
        // Optional: Logic when location changes
    }, [location]);

    const navItems = [
        {
            type: 'group',
            label: 'Master',
            items: [
                { path: '/category', label: 'Category' },
                { path: '/quotes', label: 'Quotes' },
                { path: '/template-upload', label: 'Templates' },
            ]
        },
        { type: 'single', path: '/temp-uploads-list', label: 'Temporaries List' },
        {
            type: 'group',
            label: 'Experiment',
            items: [
                { path: '/template-creation', label: 'Templates Creation' },
                { path: '/bulk-templates-generator', label: 'Bulk Templates Creation' },
                { path: '/video-creation', label: 'Video Generation' },
            ]
        }
    ];

    return (
        <div className={classNames(classes.sidebar, { [classes.open]: isSidebarOpen })}>
            <Nav defaultActiveKey="/home" className="flex-column">
                {navItems.map((item, index) => {
                    if (item.type === 'single') {
                        return (
                            <Nav.Link
                                key={index}
                                onClick={() => navigateTo(item.path, item.type)}
                                className={classNames(classes.navLink, {
                                    [classes.active]: location.pathname === item.path,
                                })}
                            >
                                <span className={classes.navLinkText}>{item.label}</span>
                                {location.pathname === item.path && <span className={classes.activeStrip} />}
                            </Nav.Link>
                        );
                    }

                    if (item.type === 'group') {
                        return (
                            <div key={index} className={classes.navGroup}>
                                <div
                                    className={classNames(classes.groupLabel, {
                                        [classes.expanded]: expandedGroup === item.label,
                                    })}
                                    onClick={() => toggleExpand(item.label)}
                                >
                                    <span className={classes.navLinkText}>{item.label}</span>
                                </div>
                                {expandedGroup === item.label && (
                                    <Nav className={classNames(classes.subNav, 'flex-column')}>
                                        {item.items.map((subItem, subIndex) => (
                                            <Nav.Link
                                                key={subIndex}
                                                onClick={() => navigateTo(subItem.path, 'group')}
                                                className={classNames(classes.navLink, classes.subNavLink, {
                                                    [classes.active]: location.pathname === subItem.path,
                                                })}
                                            >
                                                <span className={classes.navLinkText}>{subItem.label}</span>
                                                {location.pathname === subItem.path && <span className={classes.activeStrip} />}
                                            </Nav.Link>
                                        ))}
                                    </Nav>
                                )}
                            </div>
                        );
                    }

                    return null;
                })}
            </Nav>
        </div>
    );
};

export default Menu;
