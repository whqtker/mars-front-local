import { logout } from '../../features/auth/user/userSlice';
import { useDispatch } from 'react-redux';

const BASE_URL = import.meta.env.VITE_CORE_API_BASE_URL;

const useCustomFetch = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    const customFetch = async (url: string, options: RequestInit = {}) => {
        // Access Token 가져오기
        const accessToken = localStorage.getItem('accessToken');

        // 기본 헤더 설정 (Authorization 헤더 추가)
        const headers = {
            'Content-Type': 'application/json',
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        };

        // Fetch 요청 보내기
        const response = await fetch(`${BASE_URL}${url}`, {
            ...options,
            headers: {
                ...headers,
                ...(options.headers || {}),
            },
            credentials: 'include', // 쿠키 자동 전송 (HttpOnly 쿠키 전송)
        });

        // Access Token 만료 시 처리
        if (response.status === 401) {
            console.warn('Access Token 만료: Refresh Token으로 갱신 시도');

            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
                // 새 Access Token으로 재요청
                return customFetch(url, options);
            } else {
                console.error('Refresh Token도 만료됨, 로그아웃 처리 필요');
                handleLogout();
            }
        }

        return response;
    };

    const refreshAccessToken = async (): Promise<string | null> => {
        try {
            const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
                method: 'POST',
                credentials: 'include', // 쿠키 자동 전송
            });

            if (response.ok) {
                const { accessToken } = await response.json();
                localStorage.setItem('accessToken', accessToken); // 새 Access Token 저장
                console.log('Access Token 갱신 성공');
                return accessToken;
            } else {
                console.warn('Refresh Token이 유효하지 않음');
                return null;
            }
        } catch (error) {
            console.error('Access Token 갱신 중 오류:', error);
            return null;
        }
    };

    return customFetch;
};
