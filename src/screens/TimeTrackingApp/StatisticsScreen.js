import { View, Text, Pressable, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as CSS from '../../constants/css'
import { useNavigation } from '@react-navigation/native';
import Tab from '../../components/TimeTracker/Tab'


import { FontAwesome6, AntDesign, Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import useGetActivities from '../../hooks/TimeTracker/useGetActivities';
import { convertListMilisecondsToListAppTime, convertMilisecondToTimeFormat } from '../../utils/formatTimestamp';
import Txt from '../../components/commonComponents/Txt';
const { colorSet, fontSet, margin, padding, justifyCenter, background, justifyBetween, justifyAround, itemsCenter, centercenter, avatar, rounded, backgroundBlackWidget } = CSS;


const StatisticsScreen = () => {
    const [selectTabIndex, setSelectTabIndex] = useState(0)
    const listActivities = useGetActivities()
    const [totalTrackingDuration, setTotalTrackingDuration] = useState(null)
    const [tasksCompleted, setTaskCompleted] = useState(0)
    const [taskPercentage, setTaskPercentage] = useState(0)
    const [listTime, setListTime] = useState([])

    useEffect(() => {
        // Set taskCompleted count
        setTaskCompleted(listActivities?.activities?.filter(item => item.isFinished === true).length);

        // Initialize variables to hold total durations
        let totalStartToPauseDuration = 0;
        let totalResumeToPauseDuration = 0;

        // Iterate over activities
        listActivities?.activities?.forEach(activity => {
            // Iterate over timestamps of the current activity
            for (let i = 0; i < activity.timestamps.length; i++) {
                const currentTimestamp = activity.timestamps[i];
                const nextTimestamp = activity.timestamps[i + 1];

                // Calculate duration from start to pause
                if (currentTimestamp.action === 'start' && nextTimestamp && nextTimestamp.action === 'pause') {
                    const start = new Date(currentTimestamp.timestamp);
                    const pause = new Date(nextTimestamp.timestamp);
                    totalStartToPauseDuration += pause - start;
                }

                // Calculate duration from resume to pause
                if (currentTimestamp.action === 'resume' && nextTimestamp && nextTimestamp.action === 'pause') {
                    const resume = new Date(currentTimestamp.timestamp);
                    const pause = new Date(nextTimestamp.timestamp);
                    totalResumeToPauseDuration += pause - resume;
                }
            }
        });

        // Initialize an array to store total timestamp differences
        let timestampDifferences = [];

        // Iterate over the array of activities
        listActivities?.activities?.forEach(activity => {
            // Initialize variables to hold total durations for the current activity
            let totalDuration = 0;
            let startTimestamp = null;

            // Iterate over timestamps of the current activity
            for (let i = 0; i < activity.timestamps.length; i++) {
                const currentTimestamp = activity.timestamps[i];
                const nextTimestamp = activity.timestamps[i + 1];

                // Calculate duration from start to pause
                if (currentTimestamp.action === 'start') {
                    startTimestamp = new Date(currentTimestamp.timestamp);
                }

                if (currentTimestamp.action === 'pause' && startTimestamp) {
                    const pauseTimestamp = new Date(currentTimestamp.timestamp);
                    totalDuration += pauseTimestamp - startTimestamp;
                    startTimestamp = null;
                }

                // Calculate duration from resume to pause
                if (currentTimestamp.action === 'resume' && startTimestamp) {
                    const resumeTimestamp = new Date(currentTimestamp.timestamp);
                    totalDuration += resumeTimestamp - startTimestamp;
                    startTimestamp = null;
                }
            }

            // Push the total duration into the array
            timestampDifferences.push(totalDuration);
        });

        // Log the array of total timestamp differences
        setTaskPercentage(timestampDifferences.map(differences => (differences / timestampDifferences.reduce((sum, duration) => sum + duration, 0))));
        setListTime(convertListMilisecondsToListAppTime(timestampDifferences));
        // Log the total durations
        setTotalTrackingDuration(convertMilisecondToTimeFormat(totalStartToPauseDuration + totalResumeToPauseDuration));
    }, [listActivities]);
    const navigation = useNavigation()
    return (
        <View style={{ ...background, paddingBottom: 0, color: colorSet.timeTracker.white }}>
            {/* header */}
            <View style={{ ...justifyBetween, ...itemsCenter }}>
                <Pressable
                    onPress={() => navigation.navigate('MainTimeTracking')}
                >
                    <FontAwesome6 name="chevron-left" size={24} color={colorSet.timeTracker.white} />
                </Pressable>
                <Text style={{ ...fontSet.timeTracker.h2Bold, color: colorSet.timeTracker.white }}>My Productivity</Text>
                <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h4Bold }}>Done</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ ...backgroundBlackWidget, gap: 12, flex: 1 }}>
                    <View>
                        <View style={{ ...itemsCenter, gap: 5 }}>
                            <AntDesign name="checksquare" size={24} color={'green'} />
                            <Text style={{ color: colorSet.timeTracker.white }}>Task Completed</Text>
                        </View>
                        <Text style={{ color: colorSet.timeTracker.cyan, ...fontSet.timeTracker.h2Bold }}>{tasksCompleted}</Text>
                    </View>
                </View>
                <View style={{ ...backgroundBlackWidget, gap: 12, flex: 1 }}>
                    <View>
                        <View style={{ ...itemsCenter, gap: 5 }}>
                            <FontAwesome6 name="clock-four" size={24} color={colorSet.timeTracker.violet} />
                            <Text style={{ color: colorSet.timeTracker.white }}>Time duration</Text>
                        </View>
                        <Text style={{ color: colorSet.timeTracker.cyan, ...fontSet.timeTracker.h2Bold }}>{totalTrackingDuration}</Text>
                    </View>
                </View>
            </View>
            <Tab selectTabIndex={selectTabIndex} setSelectTabIndex={setSelectTabIndex} data={[{ title: 'Day', onTap: () => { } }, { title: 'Month', onTap: () => { } }]} />
            <View style={{ paddingHorizontal: 5, flex: 1, }}>
                <FlatList
                    keyExtractor={item => item._id}
                    data={listActivities.activities}
                    horizontal
                    renderItem={({ item, index }) => (
                        <View key={item._id} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-end', marginVertical: 10, marginHorizontal: 10 }}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ ...styles.eachStatisticBar, height: `${taskPercentage[index] * 100}%` }}></View>
                                <Txt text={item.name} />
                            </View>
                        </View>
                    )}
                />
            </View>
            <ScrollView style={{ marginTop: 10, flex: 1, gap: 10, borderColor: colorSet.timeTracker.softGray, borderWidth: 1, padding: 10, borderRadius: 10, maxHeight: 240 }}>
                {listActivities?.activities?.map((item, index) => (
                    <View key={item._id} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-end', marginVertical: 10, marginHorizontal: 10 }}>
                        <View style={{ ...justifyBetween, flex: 1 }}>
                            <Txt text={item.name} />
                            <Txt color={colorSet.timeTracker.softViolet} text={listTime[index]} />
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    eachStatisticBar: {
        width: 20,
        backgroundColor: colorSet.timeTracker.cyan,
        padding: 10,
        marginBottom: 10,
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3,
        justifyContent: 'center',
    }
})

export default StatisticsScreen