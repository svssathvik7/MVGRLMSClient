// src/store/persistConfig.js
import storage from 'redux-persist/lib/storage'; // or use sessionStorage

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], // Only persist teacher slice and student slice.
};

export default persistConfig;
