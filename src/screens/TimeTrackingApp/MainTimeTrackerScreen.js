import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as CSS from '../../constants/css';
import { Ionicons, Entypo, FontAwesome6, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Tab from '../../components/TimeTracker/Tab';
import ActivityCardList from '../../components/TimeTracker/ActivityCardList';
import { activitiesHomeScreen } from '../../constants/sampleData/TimeTrackerSample';
import TasksScreen from './TasksScreen';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import { getActivities } from '../../store/features/TimeTracker/activitySlice';
import useGetActivities from '../../hooks/TimeTracker/useGetActivities';


const { colorSet, fontSet, backgroundBlackWidget, margin, padding, justifyCenter, background, justifyBetween, justifyAround, itemsCenter, centercenter, avatar, rounded } = CSS;

const MainTimeTrackingScreen = () => {
    const navigation = useNavigation()
    const [selectTabIndex, setSelectTabIndex] = useState(0)
    const listActivities = useGetActivities()


    return (
        <View style={background}>
            <View style={{ ...justifyBetween, ...itemsCenter, }}>
                <Pressable style={({ pressed }) => [
                    styles.avatar,
                    pressed && { opacity: 0.8 }
                ]}
                    onPress={() => navigation.openDrawer()}
                ></Pressable>
                <Text style={{ ...fontSet.timeTracker.h3Bold, color: colorSet.timeTracker.white, }}>Activity</Text>
                <Pressable onPress={() => navigation.navigate('StatisticsTimeTracking')} style={{ borderWidth: 1, borderColor: colorSet.timeTracker.white, ...rounded.md, ...padding.sm }}><Ionicons name="stats-chart-outline" size={24} color={colorSet.timeTracker.white} /></Pressable>
            </View>
            <Tab selectTabIndex={selectTabIndex} setSelectTabIndex={setSelectTabIndex} data={[{ title: 'Activity', onTap: () => { } }, { title: 'Task', onTap: () => { } }]} />
            {
                selectTabIndex === 0 ?
                    <>
                        <Pressable
                            onPress={() => navigation.navigate('AddNewTimeTracking')}
                            style={({ pressed }) => [{ ...backgroundBlackWidget, gap: 10, borderWidth: 1, borderColor: colorSet.timeTracker.softGray },
                            pressed && { backgroundColor: colorSet.timeTracker.softGray }
                            ]}><Entypo name="plus" size={24} color={colorSet.timeTracker.white} /><Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h5Light }}>Add new activity</Text></Pressable>
                        <ActivityCardList activities={listActivities} />
                    </>
                    : <TasksScreen />
            }
        </View >
    )
}

const styles = StyleSheet.create({
    button: ({ pressed }) => ({
        backgroundColor: pressed ? '#0056b3' : '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
    }),
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    avatar: {

        ...avatar.md, backgroundColor: colorSet.timeTracker.cyan
    },
    columnActivityCard: { width: 140, padding: 10, ...justifyCenter, flexDirection: 'column', gap: 12 }
})

export default MainTimeTrackingScreen