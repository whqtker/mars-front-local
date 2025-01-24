import { useState } from 'react';
import { logoPath, userPath, pathItemMap } from '../../../shared';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../ui/NavigationBarStyle.css';

const NavigationBar: React.FC = () => {
    // 로그인 상태와 사용자 이름 관리
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    const handleLogin = () => {
        setIsLoggedIn(true);
        setUserName('abcdefg');
    };

    // 로그아웃 핸들러
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
    };

    // 유저명 길이 제한
    const formatUserName = (name: string) => {
        const maxLength = 4; // 최대 길이
        return name.length > maxLength
            ? `${name.slice(0, maxLength)}...`
            : name;
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href={pathItemMap['home'].path}>
                    <img
                        src={logoPath}
                        alt="Commars"
                        style={{ width: '30px', marginRight: '10px' }}
                    />
                    Commars
                </a>

                {/* 메뉴 */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href={pathItemMap['recommend'].path}
                            >
                                {pathItemMap['recommend'].label}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href={pathItemMap['ranking'].path}
                            >
                                {pathItemMap['ranking'].label}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href={pathItemMap['community'].path}
                            >
                                {pathItemMap['community'].label}
                            </a>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href={pathItemMap['login'].path}
                            >
                                {pathItemMap['login'].label}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href={pathItemMap['signUp'].path}
                            >
                                {pathItemMap['signUp'].label}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default NavigationBar;
