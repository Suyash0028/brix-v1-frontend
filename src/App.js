// src/App.js
import "./App.css";
import Routes from "./Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserNavbarComponent from "./components/NavbarComponent";
import ToastMessages from "./constants/ToastMessages";
import LOCAL_STORAGE_KEYS from "./utilities/LocalStorageKeys";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.brix_common_v1_login);
    history.push('/');
    toast.success(ToastMessages.Logout_Success, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="App">
      <UserNavbarComponent onLogout={handleLogout} />
      <Routes />
      <ToastContainer />
    </div>
  );
}

export default App;
