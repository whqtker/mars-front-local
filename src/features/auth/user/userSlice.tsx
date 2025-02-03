import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: string;
    name: string;
    email: string;
    profileImageUrl: string;
    isLoggedIn: boolean;
}

interface LoginPayload {
    user: UserState;
    accessToken: string;
}

const initialState: UserState = {
    id: '',
    name: '',
    email: '',
    profileImageUrl: '',
    isLoggedIn: false,
};

// localStorage에 저장된 유저 정보를 초기 상태로 설정
const savedUser = localStorage.getItem('user');
const initialUserState = savedUser ? JSON.parse(savedUser) : initialState;

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        login: (state, action: PayloadAction<LoginPayload>) => {
            const { user, accessToken } = action.payload;
            console.log('로그인 정보:', user, accessToken);

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('accessToken', accessToken);
            return { ...user, isLoggedIn: true };
        },
        logout: () => {
            // 로그아웃 시 localStorage 초기화
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            return initialState;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
