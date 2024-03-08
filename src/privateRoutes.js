import React from "react";
import { Redirect, Route } from "react-router-dom";
import LOCAL_STORAGE_KEYS from "./utilities/LocalStorageKeys";

function ProtectedRoutes({ children, ...props }) {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.brix_common_v1_login);
  return (
    <Route
      {...props}
      
      render={() => {
        return token ? children : <Redirect to={{ pathname: "/" }} />;
      }}
    />
  );
}

export default ProtectedRoutes;