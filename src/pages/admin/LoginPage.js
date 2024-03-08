// src/pages/Home.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import RequestForm from "./TweetRequests";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Login.css";
import { retrieveDataWithTimestamp } from "../../utilities/LocalStorageUtils";
import LOCAL_STORAGE_KEYS from "../../utilities/LocalStorageKeys";
import ToastMessages from "../../constants/ToastMessages";
import UserNavbarComponent from "../../components/NavbarComponent";

const LoginPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const retrievedData = retrieveDataWithTimestamp(
      LOCAL_STORAGE_KEYS.brix_common_v1_login
    );

    if (retrievedData !== null && retrievedData !== undefined) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = async () => {
    const login = {
      email: username,
      password: password,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/login`,
        login
      );
      const userToken = response.data.token;
      localStorage.setItem(LOCAL_STORAGE_KEYS.brix_common_v1_login, userToken);
      history.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
      } else {
        console.error("Error submitting data:", error);
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem(LOCAL_STORAGE_KEYS.brix_common_v1_login, "false");
    toast.success(ToastMessages.Logout_Success, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleSubmit = (e) => {
    //const { username, password } = config;
    e.preventDefault();
    // Handle login logic (authentication, API call, etc.) here

    handleLogin();
  };

  return (
    <>
      {isLoggedIn === true ? (
        <>
          <UserNavbarComponent userName={username} onLogout={handleLogout} />
          <RequestForm />
        </>
      ) : (
        <div className="login-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              {" "}
              Password:
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;
