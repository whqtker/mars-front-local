import '../ui/MainPageStyle.css';
import React from 'react';
import { SideBar, SideContainer } from '../../../widgets';

const MainPage: React.FC = () => {
    return (
        <div className="main-page-container w-full h-full">
            <div className="main-content-container flex h-full">
                <div className="side-bar-container">
                    <SideBar />
                </div>
                <div className="mt-4 ml-4 mb-4">
                    <SideContainer />
                </div>
                <div className="space-container"></div>
            </div>
            <div className="map-container"></div>
        </div>
    );
};

export default MainPage;
