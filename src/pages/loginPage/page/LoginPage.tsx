import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { logoPath } from '../../../shared';
import { GoogleLoginButton } from '../../../features';

function LoginPage() {
    // const navigate = useNavigate();

    const redirectUrl = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    console.log(clientId);
    console.log(redirectUrl);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full pt-40 pb-40 pr-80 pl-80">
            <div className="flex flex-raw items-center justify-center h-full w-full bg-gray-100 rounded-lg shadow-md p-8">
                <div className="flex flex-col items-center justify-center pr-15">
                    <img
                        src={logoPath}
                        alt="ComMars Logo"
                        className="w-38 h-33 mb-4"
                    />
                    <h1 className="text-4xl font-bold mb-8">ComMars</h1>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <div className="social-login">
                        <GoogleOAuthProvider clientId={clientId}>
                            <div className="flex justify-center">
                                <GoogleLoginButton />
                            </div>
                        </GoogleOAuthProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
