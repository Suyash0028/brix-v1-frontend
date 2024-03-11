// src/pages/Home.js
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Login.css";
import LOCAL_STORAGE_KEYS from "../../utilities/LocalStorageKeys";

const LoginPage = () => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      history.push("/admin/user-list");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
      } else {
        console.error("Error submitting data:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    //const { username, password } = config;
    e.preventDefault();
    // Handle login logic (authentication, API call, etc.) here

    handleLogin();
  };

  return (
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
  );
};

export default LoginPage;
