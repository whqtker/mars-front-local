import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationBar } from '../widgets/index';
import '../index';
import './ui/App.css';
import { pathItemMap } from '../shared/items/pathItems';

const App: React.FC = () => {
    const Home: React.FC = () => <div>홈 페이지</div>;
    const Ranking: React.FC = () => <div>리뷰어 순위</div>;
    const Login: React.FC = () => <div>로그인 페이지</div>;
    const SignUp: React.FC = () => <div>회원가입 페이지</div>;
    const Community: React.FC = () => <div>커뮤니티 페이지</div>;
    const MyPage: React.FC = () => <div>마이 페이지</div>;
    const Recommendation: React.FC = () => <div>오늘 뭐 먹지 페이지</div>;
    // fetch(import.meta.env.VITE_CORE_FRONT_BASE_URL + 'api/v1/test')
    //     .then((res) => res.json())
    //     .then((data) => console.log(data));

    // console.log(import.meta.env.VITE_CORE_FRONT_BASE_URL);
    // console.log(import.meta.env.VITE_CORE_API_BASE_URL);

    return (
        <Router>
            <NavigationBar />
            <main>
                <Routes>
                    <Route path={pathItemMap['home'].path} element={<Home />} />
                    <Route
                        path={pathItemMap['ranking'].path}
                        element={<Ranking />}
                    />
                    <Route
                        path={pathItemMap['logIn'].path}
                        element={<Login />}
                    />
                    <Route
                        path={pathItemMap['signUp'].path}
                        element={<SignUp />}
                    />
                    <Route
                        path={pathItemMap['community'].path}
                        element={<Community />}
                    />
                    <Route
                        path={pathItemMap['myPage'].path}
                        element={<MyPage />}
                    />
                    <Route
                        path="/recommendation"
                        element={<Recommendation />}
                    />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
