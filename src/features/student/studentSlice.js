import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    logged: false,
    error: null,
    loading: false,
    studentData: {
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
        bulk: 'false'
    }
}
export const studentLogin = createAsyncThunk('student/login', async ({ regd, password }, { rejectWithValue }) => {
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
const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        logOutStudent: (state, action) => {
            state.logged = false;
            localStorage.removeItem('token');
            state.studentData = null;
        },
        updateStudentData: (state, action) => {
            console.log(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(studentLogin.fulfilled, (state, action) => {
                state.studentData = action.payload.user;
                localStorage.setItem('token', action.payload.token);
                state.logged = true;
            })
            .addCase(studentLogin.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { updateStudentData, logOutStudent } = studentSlice.actions;
export default studentSlice.reducer;
