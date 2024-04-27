import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as CSS from '../../constants/css';
import { Ionicons, Entypo, FontAwesome6, MaterialIcons, FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
import ActivityTaskCardList from '../../components/TimeTracker/ActivityTaskCardList';
import { activitiesTaskScreen, timeTracker } from '../../constants/sampleData/TimeTrackerSample';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getActivities } from '../../store/features/TimeTracker/activitySlice';
import { useDispatch, useSelector } from 'react-redux';
import useGetActivities from '../../hooks/TimeTracker/useGetActivities';
import { convertTotalTimestampDurationToAppTime, convertTotalTimestampDurationToAppTimeToTimestamp } from '../../utils/formatTimestamp';
const { colorSet, fontSet, backgroundBlackWidget, margin, padding, justifyCenter, background, justifyBetween, justifyAround, itemsCenter, centercenter, avatar, rounded } = CSS;


const TasksScreen = () => {
    const navigation = useNavigation()
    const listActivities = useGetActivities()
    const [pausedActivities, setPausedActivities] = useState([])
    const [currentResumeActivities, setCurrentResumeActivities] = useState([])
    useEffect(() => {
        loadActivities()
    }, [listActivities])



    const loadActivities = () => {
        setPausedActivities(listActivities?.activities?.filter(item => item.isPaused !== false))
        setCurrentResumeActivities(listActivities?.activities?.filter(item => item.isPaused === false))
    }
    return (
        <>
            <View>
                {currentResumeActivities?.map(item => (
                    <Pressable style={({ pressed }) => [
                        { ...backgroundBlackWidget, ...justifyBetween, ...itemsCenter },
                        pressed && { opacity: 0.8 }
                    ]}
                        key={item._id}
                        onPress={() => navigation.navigate('DetailActivity', { totalDuration: convertTotalTimestampDurationToAppTimeToTimestamp(convertTotalTimestampDurationToAppTime(item.timestamps.map(item => item.timestamp))), activityId: item._id })}
                    >
                        {/* {console.log(timeTracker.activities)} */}
                        {/* {console.log(convertTotalTimestampDurationToAppTimeToTimestamp(convertTotalTimestampDurationToAppTime(item.timestamps.map(item => item.timestamp))))} */}
                        <View style={{ gap: 10 }}>
                            {/* {console.log('item', item.timestamps.map(item => item.timestamp))} */}
                            <Text style={{ color: 'white', ...fontSet.timeTracker.h2Bold }}>{convertTotalTimestampDurationToAppTime(item.timestamps.map(item => item.timestamp))}</Text>
                            <View style={{ ...itemsCenter, gap: 10 }}>
                                <AntDesign name="loading1" size={18} color={colorSet.timeTracker.violet} />
                                <Text style={{ color: 'white' }}>{item.name}</Text>
                            </View>
                        </View>
                        <Entypo name="chevron-right" size={24} color={colorSet.timeTracker.white} />
                    </Pressable>
                ))}
            </View>
            <View style={{ ...justifyBetween, ...itemsCenter }}>
                <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h3Bold }}>Today</Text>
                <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h5Light }}>See all</Text>
            </View>
            <ActivityTaskCardList activities={pausedActivities} />
        </>
    )
}

export default TasksScreen