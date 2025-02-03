import React from 'react';
import { logoPath, RootState } from '../../../shared';
import '../ui/MyPageStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from '../../../shared';

const MyPage: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    console.log(user);

    const fetchUserProfile = async () => {
        try {
            const response = await apiClient.get('/api/user/profile');
            console.log(response.data);
        } catch (error) {
            console.error('프로필 조회 오류:', error);
        }
    };

    const fetchPublicData = async () => {
        try {
            const response = await apiClient.get('/api/public/data');
            console.log('공개 데이터:', response.data);
        } catch (error) {
            console.error('공개 데이터 가져오기 실패:', error);
        }
    };

    React.useEffect(() => {
        fetchUserProfile();
        fetchPublicData();
    }, []);

    return (
        <div className="mypage-container">
            <header className="mypage-header">
                <img src={logoPath} alt="ComMars Logo" className="logo" />
                <h1>ComMars</h1>
            </header>
            <div className="mypage-content">
                <div className="review-section">
                    <p>나의 리뷰 총점 ⭐ 3.7/5.0</p>
                    <button className="review-button">
                        나의 리뷰 내역 보기
                    </button>
                </div>
                <div className="profile-section">
                    <div className="profile-header">
                        <img
                            src="/path/to/profile.png"
                            alt="프로필"
                            className="profile-picture"
                        />
                        <p className="username">닉네임,</p>
                        <button className="profile-edit-button">
                            프로필 변경
                        </button>
                    </div>
                    <div className="favorites">
                        <p>나의 찜</p>
                        <p>0</p>
                    </div>
                    <div className="monthly-benefits">
                        <p>이번 달의 혜택 보러가기</p>
                    </div>
                    <div className="stats">
                        <div className="stat-item">
                            <p>보관함</p>
                            <p>0</p>
                        </div>
                        <div className="stat-item">
                            <p>가입 라운지</p>
                            <p>0</p>
                        </div>
                        <div className="stat-item">
                            <p>저장한 글</p>
                            <p>0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
