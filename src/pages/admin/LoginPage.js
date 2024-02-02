// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import RequestForm from './TweetRequests';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/Login.css'
import config from '../../constants/Config';
import { storeDataWithTimestamp } from '../../utilities/LocalStorageUtils';
import { retrieveDataWithTimestamp } from '../../utilities/LocalStorageUtils';
import LOCAL_STORAGE_KEYS from '../../utilities/LocalStorageKeys';
import ToastMessages from '../../constants/ToastMessages';
import UserNavbarComponent from '../../components/NavbarComponent';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const retrievedData = retrieveDataWithTimestamp(LOCAL_STORAGE_KEYS.brix_common_v1_login);
        if (retrievedData !== null && retrievedData !== undefined) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.setItem(LOCAL_STORAGE_KEYS.brix_common_v1_login, 'false');
        toast.success(ToastMessages.Logout_Success, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const handleSubmit = (e) => {
        const { userName, pass } = config;
        e.preventDefault();
        // Handle login logic (authentication, API call, etc.) here

        if (username.trim() === userName && password.trim() === pass) {
            toast.success(ToastMessages.Login_Success, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setIsLoggedIn(true);
            storeDataWithTimestamp(LOCAL_STORAGE_KEYS.brix_common_v1_login, LOCAL_STORAGE_KEYS.brix_common_v1_login_true, LOCAL_STORAGE_KEYS.brix_common_v1_storageTime); // Store data with a 5-minute expiration
        }
        else {
            toast.error(ToastMessages.Login_Failed, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setIsLoggedIn(false);
        }
    };

    return (
        <>
            {
                isLoggedIn === true ?
                    <>
                        <UserNavbarComponent userName={username} onLogout={handleLogout} />
                        <RequestForm />
                    </> :
                    <div className="login-container">
                        <h2>Admin Login</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Username:
                                <input type="text" onChange={(e) => setUsername(e.target.value)} required />
                            </label>
                            <label> Password:
                                <input type="password" onChange={(e) => setPassword(e.target.value)} required />
                            </label>
                            <button type="submit">Login</button>
                        </form>
                    </div>
            }
        </>
    );
};

export default LoginPage;
