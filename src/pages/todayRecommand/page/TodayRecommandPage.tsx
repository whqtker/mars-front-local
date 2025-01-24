/*global kakao*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ui/TodayRecommandPageStyle.css';

function TodayRandom() {
    const [restaurants, setRestaurants] = useState([]);
    const [headerText, setHeaderText] = useState(
        'XX님의 방문한 맛집/찜한 리스트를 바탕으로 추천한 결과입니다.',
    );
    const [myLocation, setMyLocation] = useState(null);
    const navigate = useNavigate();

    return (
        <div>
            <a>오늘의 추천 페이지</a>
        </div>
    );
}

export default TodayRandom;
