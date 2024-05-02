import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as CSS from '../../constants/css';
import { Entypo, AntDesign } from '@expo/vector-icons';
import ActivityTaskCardList from '../../components/TimeTracker/ActivityTaskCardList';
import { useNavigation } from '@react-navigation/native';
import useGetActivities from '../../hooks/TimeTracker/useGetActivities';
import { totalLastResumeTimestampToNow } from '../../utils/formatTimestamp';
const { colorSet, fontSet, backgroundBlackWidget, margin, padding, justifyCenter, background, justifyBetween, justifyAround, itemsCenter, centercenter, avatar, rounded } = CSS;


const TasksScreen = () => {
    const navigation = useNavigation();
    const listActivities = useGetActivities();
    const [pausedActivities, setPausedActivities] = useState([]);
    const [currentResumeActivities, setCurrentResumeActivities] = useState([]);

    useEffect(() => {
        if (listActivities && listActivities.activities && listActivities.activities.length > 0) {
            const filteredActivitiesNotPause = listActivities.activities.filter(activity => {
                const lastTimestampAction = activity.timestamps[activity.timestamps.length - 1].action;
                return lastTimestampAction !== 'pause';
            });
            setCurrentResumeActivities(filteredActivitiesNotPause);

            const filteredActivitiesPause = listActivities.activities.filter(activity => {
                const lastTimestampAction = activity.timestamps[activity.timestamps.length - 1].action;
                return lastTimestampAction === 'pause' && !activity.isFinished; // Check for 'pause' and isFinished is false
            });

            setPausedActivities(filteredActivitiesPause);
        }
    }, [listActivities]);

    return (
        <>
            <View>
                {currentResumeActivities?.map(item => (
                    <Pressable
                        style={({ pressed }) => [{ ...backgroundBlackWidget, ...justifyBetween, ...itemsCenter }, pressed && { opacity: 0.8 }]}
                        key={item._id}
                        onPress={() => navigation.navigate('DetailActivity', { data: item })}
                    >
                        <View style={{ gap: 10 }}>
                            <Text style={{ color: 'white', ...fontSet.timeTracker.h2Bold }}>{item.name}</Text>
                            <View style={{ ...itemsCenter, gap: 10 }}>
                                <AntDesign name="loading1" size={18} color={colorSet.timeTracker.violet} />
                                <Text style={{ color: 'white' }}>{item.tags[0]}</Text>
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
    );
};
export default TasksScreen