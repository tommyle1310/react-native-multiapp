import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import * as CSS from '../../constants/css';
import { useNavigation } from '@react-navigation/native';

const DetailActivityScreen = () => {
    const [currentTimeTracking, setCurrentTimeTracking] = useState({ hours: 0, minutes: 32, seconds: 11 });
    const [isPause, setIsPause] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!isPause) {
            intervalRef.current = setInterval(() => {
                // Calculate the new time by incrementing seconds
                let newSeconds = currentTimeTracking.seconds + 1;
                let newMinutes = currentTimeTracking.minutes;
                let newHours = currentTimeTracking.hours;

                if (newSeconds >= 60) {
                    newSeconds = 0;
                    newMinutes++;

                    if (newMinutes >= 60) {
                        newMinutes = 0;
                        newHours++;
                    }
                }

                // Update the state variable with the new time
                setCurrentTimeTracking({ hours: newHours, minutes: newMinutes, seconds: newSeconds });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [currentTimeTracking, isPause]);

    const handlePause = () => {
        setIsPause(true); // Set isPause to true to pause the timer
    }

    const handleResume = () => {
        setIsPause(false); // Set isPause to false to resume the timer
    }

    const navigation = useNavigation();

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
                <Text style={{ fontSize: 56, fontWeight: 800, color: CSS.colorSet.timeTracker.white, marginBottom: 12, marginTop: -50 }}>{`${currentTimeTracking.hours > 0 ? currentTimeTracking.hours + ':' : ''}${currentTimeTracking.minutes < 10 ? '0' : ''}${currentTimeTracking.minutes}:${currentTimeTracking.seconds < 10 ? '0' : ''}${currentTimeTracking.seconds}`}</Text>

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
