import { createSlice } from '@reduxjs/toolkit';
interface AuthState {
    isAuthenticated: boolean;
    userRole: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    userRole : 'user'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
