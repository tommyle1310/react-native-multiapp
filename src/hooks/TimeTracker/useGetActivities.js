import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { getActivities } from '../../store/features/TimeTracker/activitySlice'

const useGetActivities = () => {
    const dispatch = useDispatch()
    const activitiesList = useSelector(state => state.activity)
    const [listActivities, setListActivities] = useState([])

    useEffect(() => {
        setListActivities(activitiesList)
    }, [activitiesList])


    useFocusEffect(
        React.useCallback(() => {
            // Define an async function
            const fetchData = async () => {
                try {
                    // Your logic here, it will run when the screen is focused
                    // Get token from AsyncStorage
                    await dispatch(getActivities())
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            // Call the async function immediately
            fetchData();

            // Return a cleanup function
            return () => {
                // Cleanup logic if needed
                // console.log('Screen is unfocused');
            };
        }, [])
    );
    return listActivities
}

export default useGetActivities