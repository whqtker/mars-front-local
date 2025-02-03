import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: string;
    username: string;
    email: string;
    profile: string;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    id: '',
    username: '',
    email: '',
    profile: '',
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            return { ...action.payload, isLoggedIn: true };
        },
        logout: () => initialState,
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
