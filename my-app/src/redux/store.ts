import userReducer from './reducers/UserReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: userReducer
});

export default store;