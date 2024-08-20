import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    logged: false,
    error: null,
    loading: false,
    userData: {
        fname: '',
        lname: '',
        regd: '',
        email: '',
        dob: '',
        year: '',
        branch: '',
        isadmin: null,
        iscr: null,
        faculty_email: '',
    }
}
export const userLogin = createAsyncThunk('user/login', async ({ regd, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/login`, { regd, password }, config);

        const { data, status } = response;

        console.log(data);

        if (status === 201) {
            return data;
        } else {
            return rejectWithValue('Login failed');
        }
    }
    catch (error) {
        return rejectWithValue(error.response.data.message || error.message);
    }
});
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOutUser: (state, action) => {
            state.logged = false;
            localStorage.removeItem('token');
            state.userData = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.userData = action.payload.user;
                localStorage.setItem('token', action.payload.token);
                state.logged = true;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { logOutUser } = userSlice.actions;
export default userSlice.reducer;
