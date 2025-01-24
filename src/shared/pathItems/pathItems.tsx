import { PathType } from './types/PathType';

export const pathItemMap: Record<string, PathType> = {
    home: { path: '/', label: '홈' },
    recommend: { path: '/recommendation', label: '오늘 뭐 먹지' },
    ranking: { path: '/ranking', label: '리뷰어 랭킹' },
    community: { path: '/community', label: '커뮤니티' },
    myPage: { path: '/mypage', label: '마이페이지' },
    login: { path: '/login', label: '로그인' },
    signUp: { path: '/signup', label: '회원가입' },
};
