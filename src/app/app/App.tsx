import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationBar } from '../../widgets';

const Home: React.FC = () => <div>Welcome to Home Page</div>;
const Ranking: React.FC = () => <div>Ranking Page</div>;
const Login: React.FC = () => <div>Login Page</div>;
const Community: React.FC = () => <div>Community Page</div>;
const MyPage: React.FC = () => <div>My Page</div>;

const App: React.FC = () => {
    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Ranking', path: '/ranking' },
        { label: 'Login', path: '/login' },
        { label: 'Community', path: '/community' },
        { label: 'My Page', path: '/mypage' },
    ];

    return (
        <Router>
            <NavigationBar items={navItems} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ranking" element={<Ranking />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
