// LoginButton.js
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/authContext";

const LoginButton = () => {
  const { login } = useAuth();

  return (
    <GoogleLogin onSuccess={login} onError={() => console.log("Login Failed")} />
  );
};

export default LoginButton;
