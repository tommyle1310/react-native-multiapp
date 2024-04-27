import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as CSS from '../../constants/css'
import { FontAwesome6, AntDesign, Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
import PieChart from 'react-native-pie-chart'
import { convertTotalResumeTimestamp, convertTotalTimestampDurationToAppTime, formatTimestampToDate, formatTimestampToDateTime, formatTimestampToTime, formattedTime, getNthNotPauseAction, getNthPauseAction, getTotalPauses } from '../../utils/formatTimestamp';


const { colorSet, fontSet, margin, padding, justifyCenter, background, justifyBetween, justifyAround, itemsCenter, centercenter, avatar, rounded } = CSS;


const DetailTimeTrackerScreen = () => {
    const route = useRoute()
    const { activity } = route.params
    const [totalResumeTime, setTotalResumeTime] = useState(null)
    const [totalPauses, setTotalPauses] = useState(0)
    const [displayTimePause, setDisplayTimePause] = useState(null)
    const [displayDatePause, setDisplayDatePause] = useState(null)
    const [displayTimeResume, setDisplayTimeResume] = useState(null)
    const [displayDateResume, setDisplayDateResume] = useState(null)
    const [displayDateTimePause, setDisplayDateTimePause] = useState(null)
    useEffect(() => {
        setTotalResumeTime(convertTotalTimestampDurationToAppTime(convertTotalResumeTimestamp(activity.timestamps)))
        setTotalPauses(getTotalPauses(activity.timestamps))
        setDisplayTimePause(formatTimestampToTime((getNthPauseAction(activity.timestamps, 1).timestamp)))
        setDisplayDatePause(formatTimestampToDate((getNthPauseAction(activity.timestamps, 1).timestamp)))
        setDisplayTimeResume(formatTimestampToTime((getNthNotPauseAction(activity.timestamps, 1).timestamp)))
        setDisplayDateResume(formatTimestampToDate((getNthNotPauseAction(activity.timestamps, 1).timestamp)))
        setDisplayDateTimePause(formatTimestampToDateTime((getNthPauseAction(activity.timestamps, 1).timestamp)))
    }, [activity.timestamps])

    const widthAndHeight = 250
    const series = [2, 2, 2, 2, 2]
    const sliceColor = [colorSet.timeTracker.cyan, colorSet.timeTracker.violet, colorSet.timeTracker.cyan, colorSet.timeTracker.violet, colorSet.timeTracker.dark]

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
                <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h4Bold }}>Done</Text>
            </View>

            {/* title */}
            <View style={{ ...justifyBetween, ...itemsCenter, paddingTop: 20 }}>
                <View style={{ gap: 4 }}>
                    <Text style={{ ...fontSet.timeTracker.h3Bold, color: colorSet.timeTracker.white }}>{activity.name}</Text>
                    <Text style={{ ...fontSet.timeTracker.h4Light, color: colorSet.timeTracker.softViolet }}>{activity.tags.length > 1 ? `${activity.tags[0]} - ${activity.tags[1]}` : activity.tags[0]}</Text>
                </View>
                <Feather name="trash-2" size={24} color={colorSet.timeTracker.white} />
            </View>
            <ScrollView>

                {/* time data */}
                <View style={{ ...justifyBetween, ...itemsCenter, marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row', ...itemsCenter, gap: 10 }}>
                        <Text style={{ ...fontSet.timeTracker.h4Light, color: colorSet.timeTracker.white }}>Total time:</Text>
                        <Text style={{ ...fontSet.timeTracker.h3Bold, color: colorSet.timeTracker.white }}>{totalResumeTime}</Text>
                    </View>
                    <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h4Bold }}>1 of {totalPauses} set</Text>
                </View>

                {/* start - pause */}
                <View style={{ ...itemsCenter, marginVertical: 20 }}>
                    <View style={{ flex: 1, gap: 10 }}>

                        <View
                            style={{ height: 30, width: 30, backgroundColor: colorSet.timeTracker.softGray, borderRadius: 9999, ...centercenter, }}
                        >
                            <FontAwesome5 name="play" size={14} color={colorSet.timeTracker.softViolet} />
                        </View>
                        <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h3Light }}>{displayTimeResume}</Text>
                        <Text style={{ color: colorSet.timeTracker.softViolet, ...fontSet.timeTracker.h5Light }}>{displayDateResume}</Text>
                    </View>
                    <View style={{ flex: 1, gap: 10 }}>
                        <View
                            style={{ height: 30, width: 30, backgroundColor: colorSet.timeTracker.softGray, borderRadius: 9999, ...centercenter, }}
                        >
                            <FontAwesome name="square" size={16} color={colorSet.timeTracker.softViolet} />
                        </View>
                        <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h3Light }}>{displayTimePause}</Text>
                        <Text style={{ color: colorSet.timeTracker.softViolet, ...fontSet.timeTracker.h5Light }}>{displayDatePause}</Text>
                    </View>
                </View>

                <View style={{ gap: 10, marginVertical: 20 }}>
                    <View style={{ ...itemsCenter, gap: 10, ...justifyCenter }}>
                        <FontAwesome5 name="pause" size={20} color={colorSet.timeTracker.softViolet} />
                        <Text style={{ color: colorSet.timeTracker.softViolet, maxWidth: 280 }}>Interupted on {displayDateTimePause}</Text>
                    </View>
                </View>
                <View style={{ gap: 10, marginVertical: 20 }}>
                    <PieChart
                        widthAndHeight={widthAndHeight}
                        series={series}
                        sliceColor={sliceColor}
                        coverRadius={0.8}
                        style={{ alignSelf: 'center' }}
                        coverFill={colorSet.timeTracker.black}
                    />
                </View>
            </ScrollView>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignSelf: 'center',
        borderRadius: 999, // large value to ensure it's a circle
    },
    gradient: {
        borderRadius: 999, // large value to ensure it's a circle
    },
    absoluteContainer: {
        position: 'absolute',
        backgroundColor: colorSet.timeTracker.black,
        width: 110,
        height: 110,
        borderRadius: 999,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        left: '50%', // Move to the center horizontally
        top: '50%', // Move to the center vertically
        marginLeft: -55, // Adjust for half of the width
        marginTop: -55, // Adjust for half of the height
    },
});

export default DetailTimeTrackerScreen