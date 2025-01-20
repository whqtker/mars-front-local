import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../ui/NavigationBar.module.css';
import { NavItem } from '../types/types';

interface NavigationBarProps {
    items: NavItem[]; // 네비게이션 항목 배열
}

const NavigationBar: React.FC<NavigationBarProps> = ({ items }) => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                {items.map((item) => (
                    <li key={item.path} className={styles.navItem}>
                        <Link to={item.path} className={styles.navLink}>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavigationBar;
