import React from 'react';
import '../ui/SideContainerStyles.css';
import { SearchBox } from '../../index';

const SideContainer: React.FC = () => {
    return (
        <div className="side-container col-3 p-4 mt-3 mb-5">
            <SearchBox />
            <h1>Main Content</h1>
            <p>
                This is the main content area. You can place additional
                components, text, or anything else you want here.
            </p>
        </div>
    );
};

export default SideContainer;
