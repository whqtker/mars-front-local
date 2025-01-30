import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { logoPath } from "../../../shared";
import "../ui/loginPageStyle.css";
import { GoogleLoginButton } from "../../../features";

function LoginPage() {
  const navigate = useNavigate();

  const redirectUrl = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  console.log(clientId);
  console.log(redirectUrl);

  return (
    <div className={"auth-container"}>
      <img src={logoPath} alt="ComMars Logo" className="logo" />
      <h1>ComMars</h1>
      <div className="auth-box">
        <div className="social-login">
          <GoogleOAuthProvider clientId={clientId}>
            <div>
              <GoogleLoginButton />
            </div>
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
