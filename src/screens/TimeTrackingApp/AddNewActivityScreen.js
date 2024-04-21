import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native'
import { Ionicons, Entypo, FontAwesome6, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as CSS from '../../constants/css';
import { useNavigation } from '@react-navigation/native';

import React from 'react'
const { colorSet, fontSet, backgroundBlackWidget, margin, padding, justifyCenter, background, justifyBetween, justifyAround, itemsCenter, centercenter, avatar, rounded } = CSS;


const AddNewActivityScreen = () => {
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
                <Text style={{ ...fontSet.timeTracker.h2Bold, color: colorSet.timeTracker.white }}>Add</Text>
                <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h4Bold }}>Done</Text>
            </View>
            <View style={{ ...backgroundBlackWidget, flexDirection: 'column', gap: 10 }}>
                <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h4Bold }}>Name:</Text>
                <TextInput style={{ color: colorSet.timeTracker.white, borderWidth: 1, borderColor: colorSet.timeTracker.softGray, padding: 5, ...rounded.sm }} />
            </View>
            <View style={{ ...backgroundBlackWidget, flexDirection: 'column', gap: 10 }}>
                <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h4Bold }}>Description:</Text>
                <TextInput style={{ color: colorSet.timeTracker.white, borderWidth: 1, borderColor: colorSet.timeTracker.softGray, padding: 5, ...rounded.sm }} />
            </View>
            <View style={{ ...backgroundBlackWidget, flexDirection: 'column', gap: 10 }}>
                <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h4Bold }}>Write a tag:</Text>
                <TextInput style={{ color: colorSet.timeTracker.white, borderWidth: 1, borderColor: colorSet.timeTracker.softGray, padding: 5, ...rounded.sm }} />
            </View>
            <Pressable
                onPress={() => { }}
                style={({ pressed }) => [
                    { padding: 10, ...rounded.md, backgroundColor: colorSet.timeTracker.violet, ...centercenter, marginVertical: 20 },
                    pressed && { opacity: 0.8 }
                ]}
            ><Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h4Bold }}>Start Tracking</Text></Pressable>
        </View>
    )
}

export default AddNewActivityScreen