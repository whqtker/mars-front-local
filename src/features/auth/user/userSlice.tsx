import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: string;
    name: string;
    email: string;
    profileImageUrl: string;
    isLoggedIn: boolean;
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
        login: (state, action: PayloadAction<UserState>) => {
            const userData = action.payload;
            localStorage.setItem('user', JSON.stringify(userData)); // 유저 정보를 localStorage에 저장
            return { ...userData, isLoggedIn: true };
        },
        logout: () => {
            localStorage.removeItem('user'); // 로그아웃 시 localStorage 초기화
            return initialState;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
