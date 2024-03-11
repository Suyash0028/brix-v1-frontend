import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// Import FontAwesome styles
import "@fortawesome/fontawesome-free/css/all.css";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import LOCAL_STORAGE_KEYS from '../utilities/LocalStorageKeys';

function BackButton() {
  const history = useHistory();
  const [token, setTokenValue] = useState();
  const handleClick = () => {
    history.goBack(); // This function navigates back to the previous page in the history stack
  };
  
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.brix_common_v1_login);
    setTokenValue(token);
  }, []);

  return (
    <>
      {token ?
        <Button onClick={handleClick} className="float-start m-3">
          Back
        </Button> :
        <></>
      }
    </>
  );
}

export default BackButton;
