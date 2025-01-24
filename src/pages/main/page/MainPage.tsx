import '../ui/MainPageStyle.css';
import React, { useEffect, useState } from 'react';
import { SideBar, SideContainer } from '../../../widgets';

const MainPage: React.FC = () => {
    useEffect(() => {
        const updateNavbarHeight = () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                const height = navbar.clientHeight + 'px';
                document.documentElement.style.setProperty(
                    '--navbar-height',
                    height,
                );
            }
        };

        // 초기 높이 설정
        updateNavbarHeight();

        // 화면 크기 조정 시 높이 업데이트
        window.addEventListener('resize', updateNavbarHeight);

        // 이벤트 클린업
        return () => {
            window.removeEventListener('resize', updateNavbarHeight);
        };
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <SideBar />
                {/* Side Container */}
                <SideContainer />
            </div>
        </div>
    );
};

export default MainPage;
