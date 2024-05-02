import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import * as CSS from '../../constants/css';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { calculateTimeTotalResumeTime, convertMilisecondToTimeFormat } from '../../utils/formatTimestamp';
import { useDispatch } from 'react-redux';
import { updateActivity, updateFinishStatusActivity } from '../../store/features/TimeTracker/activitySlice';

const DetailActivityScreen = ({ }) => {

    const dispatch = useDispatch();
    const route = useRoute();
    const navigation = useNavigation();
    const [isPause, setIsPause] = useState(false);
    const [totalPauses, setTotalPauses] = useState(0);
    const [data, setData] = useState(route.params.data);

    // Initialize elapsedTime with the previous total time before pausing
    const [elapsedTime, setElapsedTime] = useState(() => {
        const newTotalTime = calculateTimeTotalResumeTime(data.timestamps);
        return newTotalTime;
    });

    const intervalRef = useRef(null);

    useEffect(() => {
        const countPauseActions = data.timestamps.reduce((count, obj) => {
            if (obj.action === "pause") {
                count++;
            }
            return count;
        }, 0);
        setTotalPauses(countPauseActions);

        const startTimer = () => {
            intervalRef.current = setInterval(() => {
                if (!isPause) {
                    setElapsedTime(prevTime => prevTime + 1000);
                }
            }, 1000);
        };
        startTimer();

        return () => clearInterval(intervalRef.current);
    }, [data.timestamps, isPause]);

    const totalResumeTime = convertMilisecondToTimeFormat(elapsedTime);

    const handleResume = () => {
        dispatch(updateActivity({ action: 'resume', activityId: data._id }));
        setIsPause(false);
    };

    const handlePause = () => {
        dispatch(updateActivity({ action: 'pause', activityId: data._id }));
        setIsPause(true);
    };


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
                    <Text style={{ lineHeight: 25, color: CSS.colorSet.timeTracker.white, ...CSS.fontSet.timeTracker.h3Bold }}>{data.name}</Text>
                    <Text style={{ color: CSS.colorSet.timeTracker.white }}>{data.description}</Text>
                </View>
                <View style={{ borderWidth: 1, borderColor: CSS.colorSet.timeTracker.cyan, ...CSS.padding.md, ...CSS.centercenter, maxHeight: 40, ...CSS.rounded.md }}><Text style={{ color: CSS.colorSet.timeTracker.cyan }}>{data.tags[0]}</Text></View>
            </View>
            <View style={{ ...CSS.centercenter, flex: 1 }}>
                <Text style={{ fontSize: 56, fontWeight: 800, color: CSS.colorSet.timeTracker.white, marginBottom: 12, marginTop: -50 }}>{totalResumeTime}</Text>

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
                onPress={() => { dispatch(updateFinishStatusActivity({ activityId: data._id, isFinished: true })); navigation.goBack(); dispatch(updateActivity({ action: 'pause', activityId: data._id })) }}
                style={({ pressed }) => [
                    { ...CSS.centercenter, backgroundColor: CSS.colorSet.timeTracker.cyan, ...CSS.padding.md, ...CSS.rounded.lg, marginBottom: 40 },
                    pressed && { opacity: .8 }
                ]}
            ><Text style={{ ...CSS.fontSet.timeTracker.h3Bold, color: CSS.colorSet.timeTracker.white }}>Finish</Text></Pressable>
        </View>
    )
}

export default DetailActivityScreen;
