import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    logged: false,
    error: null,
    loading: false,
    teacherData: {
        fname: '',
        lname: '',
        regd: '',
        email: '',
        dob: '',
        year: '',
        branch: '',
        isadmin: null,
    }
}
export const teacherLogin = createAsyncThunk('teacher/login', async ({ regd, password }, { rejectWithValue }) => {
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
const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        logOutTeacher: (state, action) => {
            state.logged = false;
            localStorage.removeItem('token');
            state.teacherData = null;
        },
        updateTeacherData: (state, action) => {
            console.log(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(teacherLogin.fulfilled, (state, action) => {
                state.teacherData = action.payload.user;
                localStorage.setItem('token', action.payload.token);
                state.logged = true;
            })
            .addCase(teacherLogin.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { updateTeacherData, logOutTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;
