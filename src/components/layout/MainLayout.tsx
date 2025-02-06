import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import MapArea from '../map/MapArea';
import Community from '../pages/Community';
import PopularReviewers from '../pages/popularReviewers/PopularReviewersPage';

const MainLayout = () => {
    return (
        <div className="h-full flex flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Sidebar />
                                <MapArea />
                            </>
                        }
                    />
                    <Route path="/community" element={<Community />} />
                    <Route path="/reviewers" element={<PopularReviewers />} />
                </Routes>
            </div>
        </div>
    );
};

export default MainLayout;
