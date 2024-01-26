// src/pages/Home.js
import React, { useState } from 'react';
import RequestForm from './RequestForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
import config from '../../constants/Config';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [flag, setFlag] = useState('');
    
    const handleSubmit = (e) => {
        const { userName, pass } = config;
        e.preventDefault();
        // Handle login logic (authentication, API call, etc.) here
        console.log('Login submitted with:', { username, password });
        if(username === userName && password === pass){
            toast.success('Login successful!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setFlag(true);
        }
        else{
            toast.error('Login failed!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

  return (
    <>
    {flag === true ? 
        <RequestForm /> : 
        <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
            <label>Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label> Password: 
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Login</button>
        </form>
        </div>
    }
    </>
  );
};

export default LoginPage;
