import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import MapArea from './components/map/MapArea';
import Community from './components/pages/Community';
import PopularReviewers from './components/pages/PopularReviewers';
import RecommendedRestaurants from './components/pages/RecommendedRestaurants';
import MainPage from './components/pages/MainPage';
import { store } from './utils/store/Store';
import { Provider } from 'react-redux';
import React from 'react';

function App() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    <div className="min-h-screen bg-gray-100">
                        <Header />
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route
                                path="/recommendations"
                                element={<RecommendedRestaurants />}
                            />
                            <Route
                                path="/map"
                                element={
                                    <div className="relative flex">
                                        <Sidebar />
                                        <MapArea />
                                    </div>
                                }
                            />
                            <Route path="/community" element={<Community />} />
                            <Route
                                path="/reviewers"
                                element={<PopularReviewers />}
                            />
                        </Routes>
                    </div>
                </Router>
            </Provider>
        </React.StrictMode>
    );
}

export default App;
