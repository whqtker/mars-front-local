import '../ui/MainPageStyle.css';
import React, { useEffect, useState } from 'react';
import { SideBar } from '../../../widgets';

const MainPage: React.FC = () => {
    return (
        <>
            <div className="map-container"></div>
            <div className="menu-container">
                <SideBar />
            </div>
            <div></div>
            <div></div>
        </>
    );
};

export default MainPage;
