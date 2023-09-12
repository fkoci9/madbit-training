
import { login, logout } from './authSlice';

export const loginUser = () => {
    return (dispatch: any) => {
        dispatch(login());
    };
};

export const logoutUser = () => {
    return (dispatch: any) => {
        dispatch(logout());
    };
};
