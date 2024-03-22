// Navbar.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import LOCAL_STORAGE_KEYS from '../utilities/LocalStorageKeys';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ToastMessages from '../constants/ToastMessages';

const UserNavbarComponent = () => {
    const [token, setTokenValue] = useState();

    let history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.brix_common_v1_login);
        history.push("/");
        toast.success(ToastMessages.Logout_Success, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    useEffect(() => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.brix_common_v1_login);
        setTokenValue(token);
    }, []);

    return (
        <Navbar bg="dark" variant="dark" className="justify-content-between">
            <Navbar.Brand href="/" className='m-2'>Brix Admin Portal</Navbar.Brand>
            <Nav>
                {token ?
                    <Dropdown drop="down">
                        <Dropdown.Toggle variant="outline-light" id="user-dropdown" className='m-2'>
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
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    : <></>}
            </Nav>
        </Navbar>
    );
};

export default UserNavbarComponent;
