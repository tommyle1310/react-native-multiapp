import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons, Entypo, FontAwesome6, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as CSS from '../../constants/css';
import { convertIsoDateTimeToAppTime, formattedDate } from '../../utils/formatTimestamp'
import { useNavigation } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
const { colorSet, fontSet, margin, padding, justifyCenter, justifyBetween, justifyAround, itemsCenter, centercenter, avatar, rounded } = CSS


const ActivityCardList = ({ activities }) => {

    const navigation = useNavigation();
    return (
        <View style={{ gap: 10 }}>
            {activities?.activities?.length > 0 &&
                activities?.activities?.map(item => (
                    <Pressable
                        key={item._id}
                        style={({ pressed }) => [
                            pressed && { opacity: .7 }
                        ]}
                        onPressOut={() => navigation.navigate('DetailTimeTracking')}
                    >
                        <LinearGradient
                            colors={!item.isPaused ? [colorSet.timeTracker.cyan, colorSet.timeTracker.violet] : [colorSet.timeTracker.dark, colorSet.timeTracker.dark]} // Array of colors for the gradient
                            start={{ x: 0, y: 0 }} // Start point of the gradient (0, 0) is top left, (1, 1) is bottom right
                            end={{ x: 1, y: 0 }} // End point of the gradient
                            style={{ width: '100%', height: 100, ...rounded.md, flexDirection: 'row', position: 'relative' }} // Style for the gradient container
                        >
                            <View style={item.isPaused ? { height: 30, width: 30, backgroundColor: colorSet.timeTracker.softPurple, borderRadius: 9999, ...centercenter, zIndex: 10, position: 'absolute', top: 20, right: 20 } : { height: 30, width: 30, backgroundColor: colorSet.timeTracker.softGray, borderRadius: 9999, ...centercenter, zIndex: 10, position: 'absolute', top: 20, right: 20 }}>
                                {item.isPaused ? <FontAwesome name="square" size={16} color="black" /> : <FontAwesome5 name="play" size={14} color={colorSet.timeTracker.softViolet} />}
                            </View>
                            <View style={{ ...styles.columnActivityCard, flex: 1, justifyContent: 'space-between' }}>
                                <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h5Bold }}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', gap: 5, ...itemsCenter }}>
                                    <FontAwesome6 name="calendar" size={12} color={colorSet.timeTracker.white} />
                                    <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.small }}>{convertIsoDateTimeToAppTime(item.timestamps[0].timestamp)}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, ...styles.columnActivityCard }}>
                                <View style={{ ...itemsCenter, gap: 5 }}>
                                    <MaterialIcons name="route" size={24} color={colorSet.timeTracker.white} />
                                    <Text style={{ color: colorSet.timeTracker.white }}>{item.tags[1]}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 5, ...itemsCenter, flex: 1, alignItems: 'flex-end' }}>
                                    <FontAwesome6 name="calendar" size={12} color={colorSet.timeTracker.white} />
                                    <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.small, }}>{convertIsoDateTimeToAppTime(item.timestamps[item.timestamps.length - 1].timestamp)}</Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </Pressable>

                ))
            }
        </View>
    )
}


const styles = StyleSheet.create({
    backgroundBlackWidget: { ...padding.md, marginVertical: 10, ...rounded.sm, backgroundColor: colorSet.timeTracker.dark, flexDirection: 'row' },
    columnActivityCard: { width: 140, padding: 10, ...justifyCenter, flexDirection: 'column', gap: 12 }
})

export default ActivityCardList