import '../ui/MainPageStyle.css';
import React from 'react';
import { SideBar, SideContainer } from '../../../widgets';

const MainPage: React.FC = () => {
    return (
        <div className="main-page-container">
            <div className="main-content-container flex">
                <div className="side-bar-container">
                    <SideBar />
                </div>
                <div className="main-content">
                    <SideContainer />
                </div>
                <div className="space-container"></div>
            </div>
            <div className="map-container"></div>
        </div>
    );
};

export default MainPage;
