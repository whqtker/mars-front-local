import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const [user, setUser] = useState(null);

  const handleSuccess = async (response: any) => {
    console.log("Login Success:", response);
    const idToken = response.credential; // Google에서 받은 ID Token

    try {
      const res = await fetch("http://localhost:8090/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ token: idToken }),
        credentials: "include", // CORS에서 인증 정보 포함
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Server Response:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleFailure = () => {
    console.error("Google Login Failed");
  };

  return (
    <div>
      {user ? (
        <div>
          <h3>환영합니다, {user}!</h3>
          <img src={user} alt="Profile" width="50" height="50" />
        </div>
      ) : (
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
      )}
    </div>
  );
};

export default GoogleLoginButton;
