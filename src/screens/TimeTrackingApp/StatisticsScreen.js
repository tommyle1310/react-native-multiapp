import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import * as CSS from '../../constants/css'
import { useNavigation } from '@react-navigation/native';
import Tab from '../../components/TimeTracker/Tab'


import { FontAwesome6, AntDesign, Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
const { colorSet, fontSet, margin, padding, justifyCenter, background, justifyBetween, justifyAround, itemsCenter, centercenter, avatar, rounded, backgroundBlackWidget } = CSS;


const StatisticsScreen = () => {
    const [selectTabIndex, setSelectTabIndex] = useState(0)

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
                        <Text style={{ color: colorSet.timeTracker.cyan, ...fontSet.timeTracker.h2Bold }}>12</Text>
                    </View>
                </View>
                <View style={{ ...backgroundBlackWidget, gap: 12, flex: 1 }}>
                    <View>
                        <View style={{ ...itemsCenter, gap: 5 }}>
                            <FontAwesome6 name="clock-four" size={24} color={colorSet.timeTracker.violet} />
                            <Text style={{ color: colorSet.timeTracker.white }}>Time duration</Text>
                        </View>
                        <Text style={{ color: colorSet.timeTracker.cyan, ...fontSet.timeTracker.h2Bold }}>1h46m</Text>
                    </View>
                </View>
            </View>
            <Tab selectTabIndex={selectTabIndex} setSelectTabIndex={setSelectTabIndex} data={[{ title: 'Day', onTap: () => { } }, { title: 'Month', onTap: () => { } }]} />

        </View>
    )
}

export default StatisticsScreen