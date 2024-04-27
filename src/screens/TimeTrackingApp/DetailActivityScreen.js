import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import * as CSS from '../../constants/css';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { convertTimestamp } from '../../utils/formatTimestamp';
import { useDispatch } from 'react-redux';
import { updateActivity } from '../../store/features/TimeTracker/activitySlice';

const DetailActivityScreen = ({ }) => {
    const dispatch = useDispatch()
    const route = useRoute()
    const navigation = useNavigation();
    const [currentTimeTracking, setCurrentTimeTracking] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isPause, setIsPause] = useState(false);
    const intervalRef = useRef(null);

    const { totalDuration } = route.params
    // console.log('check hreressss,', route.params.activityId);
    useEffect(() => {
        const totalResumeTime = convertTimestamp(totalDuration);
        setCurrentTimeTracking(totalResumeTime);
    }, [totalDuration]);


    useEffect(() => {
        if (!isPause) {
            intervalRef.current = setInterval(() => {
                // Calculate the new time by incrementing seconds
                let newSeconds = currentTimeTracking.seconds + 1;
                let newMinutes = currentTimeTracking.minutes;
                let newHours = currentTimeTracking.hours;
                let newDays = currentTimeTracking.days;
                let newMonths = currentTimeTracking.months;
                let newYears = currentTimeTracking.years;

                if (newSeconds >= 60) {
                    newSeconds = 0;
                    newMinutes++;

                    if (newMinutes >= 60) {
                        newMinutes = 0;
                        newHours++;

                        if (newHours >= 24) {
                            newHours = 0;
                            newDays++;

                            // Implement logic for leap years, months, etc.
                            // Increment months, years, etc. accordingly
                        }
                    }
                }

                // Update the state variable with the new time
                setCurrentTimeTracking({
                    years: newYears,
                    months: newMonths,
                    days: newDays,
                    hours: newHours,
                    minutes: newMinutes,
                    seconds: newSeconds
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [currentTimeTracking, isPause]);

    const handlePause = () => {
        dispatch(updateActivity({ activityId: route.params.activityId, action: 'pause' }))
        setIsPause(true); // Set isPause to true to pause the timer
    }

    const handleResume = () => {
        dispatch(updateActivity({ activityId: route.params.activityId, action: 'resume' }))

        setIsPause(false); // Set isPause to false to resume the timer
    }

    const getUnixTimestamp = () => {
        const { years, months, days, hours, minutes, seconds } = currentTimeTracking;
        // Convert years, months, and days to milliseconds
        const yearMs = years * 365 * 24 * 60 * 60 * 1000; // Assuming a year has 365 days
        const monthMs = months * 30 * 24 * 60 * 60 * 1000; // Assuming a month has 30 days
        const dayMs = days * 24 * 60 * 60 * 1000;

        // Convert hours, minutes, and seconds to milliseconds
        const hourMs = hours * 60 * 60 * 1000;
        const minuteMs = minutes * 60 * 1000;
        const secondMs = seconds * 1000;

        // Calculate total milliseconds
        const totalMs = yearMs + monthMs + dayMs + hourMs + minuteMs + secondMs;

        return totalMs;
    };
    // console.log('time now:', getUnixTimestamp())



    return (
        <View style={{ ...CSS.background, paddingBottom: 0, color: CSS.colorSet.timeTracker.white }}>
            {/* header */}
            <View style={{ ...CSS.justifyBetween, ...CSS.itemsCenter }}>
                <Pressable onPress={() => navigation.navigate('MainTimeTracking')}>
                    <FontAwesome6 name="chevron-left" size={24} color={CSS.colorSet.timeTracker.white} />
                </Pressable>
                <Text style={{ ...CSS.fontSet.timeTracker.h2Bold, color: CSS.colorSet.timeTracker.white }}>Add</Text>
                <Text style={{ color: CSS.colorSet.timeTracker.white, ...CSS.fontSet.timeTracker.h4Bold }}>Done</Text>
            </View>
            <View style={{ ...CSS.justifyBetween, marginVertical: 20 }}>
                <View style={{ maxWidth: 210, gap: 20 }}>
                    <Text style={{ lineHeight: 25, color: CSS.colorSet.timeTracker.white, ...CSS.fontSet.timeTracker.h3Bold }}>Time Tracking project</Text>
                    <Text style={{ color: CSS.colorSet.timeTracker.white }}>Description</Text>
                </View>
                <View style={{ borderWidth: 1, borderColor: CSS.colorSet.timeTracker.cyan, ...CSS.padding.md, ...CSS.centercenter, maxHeight: 40, ...CSS.rounded.md }}><Text style={{ color: CSS.colorSet.timeTracker.cyan }}>Work</Text></View>
            </View>
            <View style={{ ...CSS.centercenter, flex: 1 }}>
                <Text style={{ fontSize: 56, fontWeight: 800, color: CSS.colorSet.timeTracker.white, marginBottom: 12, marginTop: -50 }}>{`${currentTimeTracking.years > 0 ? currentTimeTracking.years + ':' : ''}${currentTimeTracking.months > 0 ? currentTimeTracking.months + ':' : ''}${currentTimeTracking.days > 0 ? currentTimeTracking.days + ' ' : ''}${currentTimeTracking.hours < 10 ? '0' : ''}${currentTimeTracking.hours}:${currentTimeTracking.minutes < 10 ? '0' : ''}${currentTimeTracking.minutes}:${currentTimeTracking.seconds < 10 ? '0' : ''}${currentTimeTracking.seconds}`}</Text>

                {isPause ?
                    <Pressable
                        onPress={() => handleResume()}
                        style={({ pressed }) => [
                            { ...CSS.centercenter, backgroundColor: CSS.colorSet.timeTracker.softPurple, ...CSS.padding.lg, ...CSS.rounded.lg, marginBottom: 40, flexDirection: 'row', gap: 10 },
                            pressed && { opacity: .8 }
                        ]}>
                        <FontAwesome5 name="play" size={24} color={CSS.colorSet.timeTracker.white} />
                        <Text style={{ ...CSS.fontSet.timeTracker.h3Bold, color: CSS.colorSet.timeTracker.white }}>Resume</Text>
                    </Pressable> :
                    <Pressable
                        onPress={() => handlePause()}
                        style={({ pressed }) => [
                            { ...CSS.centercenter, backgroundColor: CSS.colorSet.timeTracker.softPurple, ...CSS.padding.lg, ...CSS.rounded.lg, marginBottom: 40, flexDirection: 'row', gap: 10 },
                            pressed && { opacity: .8 }
                        ]}>
                        <FontAwesome5 name="pause" size={24} color={CSS.colorSet.timeTracker.white} />
                        <Text style={{ ...CSS.fontSet.timeTracker.h3Bold, color: CSS.colorSet.timeTracker.white }}>Pause</Text>
                    </Pressable>
                }
            </View>
            <Pressable
                style={({ pressed }) => [
                    { ...CSS.centercenter, backgroundColor: CSS.colorSet.timeTracker.cyan, ...CSS.padding.md, ...CSS.rounded.lg, marginBottom: 40 },
                    pressed && { opacity: .8 }
                ]}
            ><Text style={{ ...CSS.fontSet.timeTracker.h3Bold, color: CSS.colorSet.timeTracker.white }}>Finish</Text></Pressable>
        </View>
    )
}

export default DetailActivityScreen;
