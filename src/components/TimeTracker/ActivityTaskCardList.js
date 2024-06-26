import React from 'react'
import { View, Text, Pressable } from 'react-native'
import * as CSS from '../../constants/css';
import { Ionicons, Entypo, FontAwesome6, MaterialIcons, FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { updateActivity } from '../../store/features/TimeTracker/activitySlice';
const { colorSet, fontSet, backgroundBlackWidget, margin, padding, justifyCenter, background, justifyBetween, justifyAround, itemsCenter, centercenter, avatar, rounded } = CSS;


const ActivityTaskCardList = ({ activities }) => {
    const dispatch = useDispatch()
    return (
        <>
            {activities?.length > 0 &&
                activities.map((item) => (
                    <View key={item._id} style={{ ...justifyBetween, ...itemsCenter }}>
                        <View style={{ ...backgroundBlackWidget, borderWidth: 1, gap: 10, flex: 1, borderColor: colorSet.timeTracker.softGray, ...justifyBetween, ...itemsCenter }}>
                            <View style={{ ...avatar.md, backgroundColor: colorSet.timeTracker.violet, borderRadius: 999 }}></View>
                            <View style={{ flex: 1, gap: 10 }}>
                                <Text style={{ color: colorSet.timeTracker.white }}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    {item.tags &&
                                        item.tags.map((item, index) => (
                                            <View key={index} style={index % 2 ? { backgroundColor: colorSet.timeTracker.softGray, ...centercenter, ...padding.sm, ...rounded.sm } : { backgroundColor: colorSet.timeTracker.softPurple, ...centercenter, ...padding.sm, ...rounded.sm }}><Text style={{ color: colorSet.timeTracker.cyan }}>{item}</Text></View>
                                        ))
                                    }
                                </View>
                            </View>
                            <View style={{ ...centercenter, gap: 10 }}>
                                <Text style={{ color: colorSet.timeTracker.white }}>{item.duration}</Text>
                                <Pressable style={({ pressed }) => [
                                    pressed && { opacity: 0.3 }
                                ]}
                                    onPress={() => { dispatch(updateActivity({ activityId: item._id, action: 'resume' })) }}
                                >
                                    <FontAwesome5 name="play" size={20} color={colorSet.timeTracker.white} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                ))
            }

        </>
    )
}

export default ActivityTaskCardList