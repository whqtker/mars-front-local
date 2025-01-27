import React, { useState } from "react";
import "../ui/SideContainerStyles.css";
import Likes from "../likes/Likes";
import PathFinder from "../pathFinder/PathFinder";
import PopularKeywords from "../popularKeywords/PopularKeywords";
import Search from "../search/Search";

interface SideContainerProps {
  selectedMenu: string;
}

const SideContainer: React.FC<SideContainerProps> = ({ selectedMenu }) => {
  const renderContent = () => {
    switch (selectedMenu) {
      case "search":
        return <Search />;
      case "likes":
        return <Likes />;
      case "pathFinder":
        return <PathFinder />;
      case "popularKeywords":
        return <PopularKeywords />;
      default:
        return <Search />;
    }
  };

  return (
    <div className="side-container col-3 flex flex-col items-center bg-gray-200 p-4 border border-gray-300 h-full rounded-lg shadow-lg w-90">
      {renderContent()}
    </div>
  );
};

export default SideContainer;
