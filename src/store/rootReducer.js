
import { combineReducers } from '@reduxjs/toolkit';
import persistConfig from './persistConfig';
import { persistReducer } from 'redux-persist';
import userReducer from "../features/user/userSlice";

const rootReducer = combineReducers({
    user: userReducer
    // other reducers can go here
});

export default persistReducer(persistConfig, rootReducer);
