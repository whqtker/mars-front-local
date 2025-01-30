import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../providers/AuthProvider";
import axios from "axios";

const GoogleLoginButton = () => {
  const { login } = useAuth();
  const [jwtToken, setJwtToken] = useState(null);
  const [error, setError] = useState(null);

  const handleSuccess = async (response: any) => {
    console.log("Login Success:", response);
    const idToken = response.credential; // Google에서 받은 ID Token

    console.log("idToken", idToken);

    try {
      // 서버로 id_token을 전송하여 검증하고 JWT를 발급받음
      const res = await axios.post(
        import.meta.env.VITE_CORE_API_BASE_URL + "/api/auth/google",
        {
          idToken,
        }
      );
      console.log("Server Response:", res.data);
      setJwtToken(res.data.token);
      setError(null);
    } catch (err) {
      console.error("Login error", err);
    }
  };

  const handleFailure = () => {
    console.error("Google Login Failed");
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </div>
  );
};

export default GoogleLoginButton;
