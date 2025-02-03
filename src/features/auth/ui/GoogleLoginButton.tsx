import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../features';

const GoogleLoginButton = () => {
    const dispatch = useDispatch();

    const handleLogin = async (
        accessToken: string,
        id: string,
        name: string,
        email: string,
        profileImageUrl: string,
    ) => {
        const user = {
            id: id,
            name: name,
            email: email,
            profileImageUrl: profileImageUrl,
            isLoggedIn: true,
        };

        dispatch(login({ user, accessToken }));
    };

    const handleSuccess = async (response: { credential: string }) => {
        console.log('Login Success:', response);
        const idToken = response.credential; // Google에서 받은 ID Token

        console.log('idToken', idToken);

        try {
            // 서버로 id_token을 전송하여 검증하고 JWT를 발급받음
            const res = await axios.post(
                import.meta.env.VITE_CORE_API_BASE_URL + '/api/auth/google',
                {
                    idToken,
                },
            );
            console.log('Login Response:', res.data);

            handleLogin(
                res.data.accessToken,
                res.data.googleAuth.id,
                res.data.googleAuth.name,
                res.data.googleAuth.email,
                res.data.googleAuth.profileImageUrl,
            );
            console.log(
                'Access Token in LocalStorage: ',
                localStorage.getItem('accessToken'),
            );
        } catch (err) {
            console.error('Login error', err);
        }
    };

    const handleFailure = () => {
        console.error('Google Login Failed');
    };

    return (
        <div>
            <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
        </div>
    );
};

export default GoogleLoginButton;
