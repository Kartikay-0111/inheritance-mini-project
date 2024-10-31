// LogoutButton.js
import React from "react";
import { useAuth } from "../context/authContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button className="btn btn-primary" onClick={logout}>
      Log Out
    </button>
  );
};

export default LogoutButton;
