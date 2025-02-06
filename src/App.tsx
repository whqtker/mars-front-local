import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import MapArea from './components/map/MapArea';
import { store } from './utils/store/Store';
import { Provider } from 'react-redux';
import React from 'react';

import {
    MainPage,
    CommunityPage,
    PopularReviewersPage,
    RecommendedRestaurantsPage,
    RestaurantDetailPage,
    AuthNaverCallback,
} from './components/pages';

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
                                element={<RecommendedRestaurantsPage />}
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
                            <Route
                                path="/community"
                                element={<CommunityPage />}
                            />
                            <Route
                                path="/reviewers"
                                element={<PopularReviewersPage />}
                            />
                            <Route
                                path="/auth/naver/callback"
                                element={<AuthNaverCallback />}
                            />
                        </Routes>
                    </div>
                </Router>
            </Provider>
        </React.StrictMode>
    );
}

export default App;
