import { View, Text, Pressable } from 'react-native'
import React from 'react'
import * as CSS from '../../constants/css';
import { Ionicons, Entypo, FontAwesome6, MaterialIcons, FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
import ActivityTaskCardList from '../../components/TimeTracker/ActivityTaskCardList';
import { activitiesTaskScreen } from '../../constants/sampleData/TimeTrackerSample';
import { useNavigation } from '@react-navigation/native';
const { colorSet, fontSet, backgroundBlackWidget, margin, padding, justifyCenter, background, justifyBetween, justifyAround, itemsCenter, centercenter, avatar, rounded } = CSS;


const TasksScreen = () => {
    const navigation = useNavigation()
    return (
        <>
            <Pressable style={({ pressed }) => [
                { ...backgroundBlackWidget, ...justifyBetween, ...itemsCenter },
                pressed && { opacity: 0.8 }
            ]}
                onPress={() => navigation.navigate('DetailActivity')}
            >
                <View style={{ gap: 10 }}>
                    <Text style={{ color: 'white', ...fontSet.timeTracker.h2Bold }}>00:32:10</Text>
                    <View style={{ ...itemsCenter, gap: 10 }}>
                        <AntDesign name="loading1" size={18} color={colorSet.timeTracker.violet} />
                        <Text style={{ color: 'white' }}>Timetracker Project</Text>
                    </View>
                </View>
                <Entypo name="chevron-right" size={24} color={colorSet.timeTracker.white} />
            </Pressable>
            <View style={{ ...justifyBetween, ...itemsCenter }}>
                <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h3Bold }}>Today</Text>
                <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h5Light }}>See all</Text>
            </View>
            <ActivityTaskCardList activities={activitiesTaskScreen} />
        </>
    )
}

export default TasksScreen