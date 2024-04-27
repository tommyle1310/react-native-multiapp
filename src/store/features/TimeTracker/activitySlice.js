import { createSlice } from '@reduxjs/toolkit';
import axios from '../../../api/axios'
import { navigate } from '../../../Navigation/NavigationRef';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    activities: [],
    error: '',
};

export const activitySlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getActivitiesReducer: (state, action) => {
            state.activities = action.payload; // Assuming your sign-in action provides a token
            state.error = ''; // Clear any previous errors
        },
    },
});

// Example async sign-in thunk action
export const addActivity = ({ name, tags, description }) => async (dispatch) => {

    try {
        const currentUserId = await AsyncStorage.getItem('userId')
        // Perform sign-in logic (e.g., API call)
        const response = await axios.post('/activity', { name, tags, description, userId: currentUserId });
        console.log(response.data);

    } catch (error) {
        console.log(error.message)
        dispatch(signinFailure(error.message)); // Dispatch failure action with error message
    }
}
const { getActivitiesReducer } = activitySlice.actions;
export const getActivities = () => async (dispatch) => {
    try {
        const currentUserId = await AsyncStorage.getItem('userId');
        const response = await axios.get(`/activity?userId=${currentUserId}`);
        dispatch(getActivitiesReducer(response.data.data)); // Dispatch success action with activities data
    } catch (error) {
        console.log(error.message);
    }
};


export const updateActivity = ({ action, activityId }) => async (dispatch) => {
    try {
        const response = await axios.put(`/activity`, { action, activityId });
        console.log('res:', response.data.data);
        dispatch(getActivities()); // Dispatch getActivities action to update activities after successful update
    } catch (error) {
        console.log(error.message);
        // Handle error
    }
};


export default activitySlice.reducer;
