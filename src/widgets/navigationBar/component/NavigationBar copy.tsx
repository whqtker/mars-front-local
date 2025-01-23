import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../ui/NavigationBar.module.css';
import { navigationBarItems } from '../items/NavigationBarItems';
import { userPath } from '../../../shared/index';
import { logoPath } from '../../../shared/index';

const NavigationBar: React.FC = () => {
    // 로그인 상태와 사용자 이름 관리
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
    const [userName, setUserName] = useState(''); // 로그인된 사용자 이름

    // 주소
    const homePageLink = '/';
    const myPageLink = '/mypage';
    const loginPageLink = '/login';
    const signupPageLink = '/signup';

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
        <nav className={styles.navbar}>
            {/* 네비게이션 메뉴 */}

            <ul className={styles.navList}>
                {/* 로고 */}
                <Link
                    to="/"
                    className={`${styles.navLink} ${styles.itemWidth}`}
                >
                    <img src={logoPath} alt="Commars" className={styles.logo} />
                </Link>
                {navigationBarItems.map((item) => (
                    <Link to={item.path} className={styles.navLink}>
                        <li
                            key={item.path}
                            className={`${styles.navItem} ${styles.itemWidth}`}
                        >
                            {item.label}
                        </li>
                    </Link>
                ))}
                {/* 사용자 상태에 따라 UI 변경 */}
                <div className={`${styles.userSection} ${styles.itemWidth}`}>
                    {isLoggedIn ? (
                        <div className={`${styles.loggedIn}`}>
                            <Link to={myPageLink} className={styles.navLink}>
                                <li
                                    key={myPageLink}
                                    className={`${styles.navItem} ${styles.itemWidth}`}
                                >
                                    <img
                                        src={userPath}
                                        alt="User Icon"
                                        className={styles.userIcon}
                                    />
                                    <li>{formatUserName(userName)}님</li>
                                </li>
                            </Link>
                            <Link
                                to={homePageLink}
                                className={styles.navLink}
                                onClick={handleLogout}
                            >
                                <li
                                    key={homePageLink}
                                    className={`${styles.navItem} ${styles.itemWidth}`}
                                >
                                    로그아웃
                                </li>
                            </Link>
                        </div>
                    ) : (
                        <div className={styles.loggedOut}>
                            <div className={`${styles.navItem}`}>
                                <Link
                                    to={loginPageLink}
                                    className={styles.navLink}
                                    onClick={handleLogin}
                                >
                                    <li
                                        key={loginPageLink}
                                        className={`${styles.navItem} ${styles.itemWidth}`}
                                    >
                                        로그인
                                    </li>
                                </Link>
                            </div>{' '}
                            <div className={`${styles.navItem}`}>
                                <Link
                                    to={signupPageLink}
                                    className={styles.navLink}
                                >
                                    <li
                                        key={signupPageLink}
                                        className={`${styles.navItem} ${styles.itemWidth}`}
                                    >
                                        회원가입
                                    </li>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </ul>
        </nav>
    );
};

export default NavigationBar;
