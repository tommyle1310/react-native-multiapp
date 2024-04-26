import { createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios'
import { navigate } from '../../Navigation/NavigationRef';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    token: null,
    error: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signinSuccess: (state, action) => {
            state.token = action.payload; // Assuming your sign-in action provides a token
            state.error = ''; // Clear any previous errors
        },
        signinFailure: (state, action) => {
            state.token = null; // Reset token
            state.error = action.payload; // Set error message
        },
    },
});

// Action creators are generated for each case reducer function
export const { signinSuccess, signinFailure } = authSlice.actions;

// Example async sign-in thunk action
export const signin = ({ email, password }) => async (dispatch) => {

    try {
        // Perform sign-in logic (e.g., API call)
        const response = await axios.post('/signin', { email, password });
        // Assuming your API returns a token upon successful sign-in
        const token = response.data.data.token;
        if (token) {
            dispatch(signinSuccess(token)); // Dispatch success action with token
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userId', response.data.data.userId);
        }
        if (response.data.errCode === 0) {
            // Redirect to 'MainTrack' screen
            navigate('TimeTracking')
        }
    } catch (error) {
        dispatch(signinFailure(error.message)); // Dispatch failure action with error message
    }
};

export const signup = ({ email, password, username }) => async (dispatch) => {

    try {
        // Perform sign-in logic (e.g., API call)
        const response = await axios.post('/signup', { email, password, username });
        // Assuming your API returns a token upon successful sign-in
        console.log(response.data);
        const token = response.data.data.token;
        dispatch(signinSuccess(token)); // Dispatch success action with token
        if (response.data.errCode === 0) {
            // Redirect to 'MainTrack' screen
            navigate('Signin')
        }
    } catch (error) {
        dispatch(signinFailure(error.message)); // Dispatch failure action with error message
    }
};

export const persistLogin = () => async (dispatch) => {

    try {
        const checkToken = await AsyncStorage.getItem('token')
        if (checkToken) {
            navigate('TimeTracking')
            return true
        }
        else {
            navigate('AuthGroup')
            return false
        }
    } catch (error) {
        dispatch(signinFailure(error.message)); // Dispatch failure action with error message
    }
};

export const signout = () => async (dispatch) => {

    try {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('userId')
        navigate('AuthGroup')
    } catch (error) {
        dispatch(signinFailure(error.message)); // Dispatch failure action with error message
    }
};



export default authSlice.reducer;
