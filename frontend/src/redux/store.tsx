import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import appReducer from "./postSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;