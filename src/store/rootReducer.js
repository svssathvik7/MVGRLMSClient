
import { combineReducers } from '@reduxjs/toolkit';
import teacherReducer from '../features/teacher/teacherSlice';
import persistConfig from './persistConfig';
import { persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
    teacher: teacherReducer,
    // other reducers can go here
});

export default persistReducer(persistConfig, rootReducer);
