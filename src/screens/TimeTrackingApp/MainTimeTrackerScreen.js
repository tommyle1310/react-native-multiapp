import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as CSS from '../../constants/css';
import { Ionicons, Entypo, FontAwesome6, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Tab from '../../components/TimeTracker/Tab';
import ActivityCard from '../../components/TimeTracker/ActivityCardList';
import ActivityCardList from '../../components/TimeTracker/ActivityCardList';
import { activitiesHomeScreen } from '../../constants/sampleData/TimeTrackerSample';

const { colorSet, fontSet, margin, padding, justifyCenter, background, justifyBetween, justifyAround, itemsCenter, centercenter, avatar, rounded } = CSS;

const MainTimeTrackingScreen = () => {
    const [selectTabIndex, setSelectTabIndex] = useState(0)


    return (
        <View style={background}>
            <View style={{ ...justifyBetween, ...itemsCenter, }}>
                <Pressable style={({ pressed }) => [
                    styles.avatar,
                    pressed && { opacity: 0.8 }
                ]}></Pressable>
                <Text style={{ ...fontSet.timeTracker.h3Bold, color: colorSet.timeTracker.white, }}>Activity</Text>
                <Pressable style={{ borderWidth: 1, borderColor: colorSet.timeTracker.white, ...rounded.md, ...padding.sm }}><Ionicons name="stats-chart-outline" size={24} color={colorSet.timeTracker.white} /></Pressable>
            </View>
            <Tab selectTabIndex={selectTabIndex} setSelectTabIndex={setSelectTabIndex} data={[{ title: 'Activity', onTap: () => { } }, { title: 'Task', onTap: () => { } }]} />
            <Pressable
                style={({ pressed }) => [{ ...styles.backgroundBlackWidget, gap: 10, borderWidth: 1, borderColor: colorSet.timeTracker.softGray },
                pressed && { backgroundColor: colorSet.timeTracker.softGray }
                ]}><Entypo name="plus" size={24} color={colorSet.timeTracker.white} /><Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h5Light }}>Add new activity</Text></Pressable>
            <ActivityCardList activities={activitiesHomeScreen} />
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
    backgroundBlackWidget: { ...padding.md, marginVertical: 10, ...rounded.sm, backgroundColor: colorSet.timeTracker.dark, flexDirection: 'row' },
    columnActivityCard: { width: 140, padding: 10, ...justifyCenter, flexDirection: 'column', gap: 12 }
})

export default MainTimeTrackingScreen