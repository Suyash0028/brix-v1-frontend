// Navbar.js
import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

const UserNavbarComponent = ({ userName, onLogout }) => {
    return (
        <Navbar bg="dark" variant="dark" className="justify-content-between">
            <Navbar.Brand href="/">Brix Admin Portal</Navbar.Brand>
            <Nav>
                <Dropdown drop="down">
                    <Dropdown.Toggle variant="outline-light" id="user-dropdown">
                        {/* Placeholder icon, replace with your user persona icon */}
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        style={{
                            position: 'absolute',
                            right: 0,
                            left: 'auto',
                            minWidth: '10rem', // Adjust as needed
                        }}
                    >
                        <Dropdown.ItemText>Hello, {userName}</Dropdown.ItemText>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Navbar>
    );
};

export default UserNavbarComponent;
