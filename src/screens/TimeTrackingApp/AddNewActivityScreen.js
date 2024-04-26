import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native'
import { Ionicons, Entypo, FontAwesome6, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as CSS from '../../constants/css';
import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addActivity } from '../../store/features/TimeTracker/activitySlice';
const { colorSet, fontSet, backgroundBlackWidget, margin, padding, justifyCenter, background, justifyBetween, justifyAround, itemsCenter, centercenter, avatar, rounded } = CSS;


const AddNewActivityScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [tag1, setTag1] = useState('')
    const [tag2, setTag2] = useState('')

    const handleSubmit = () => {
        dispatch(addActivity({ name, tags: [tag1, tag2], description }))
        // console.log(name, [tag1, tag2], description);
    }


    return (
        <View style={{ ...background, paddingBottom: 0, color: colorSet.timeTracker.white }}>
            {/* header */}
            <View style={{ ...itemsCenter }}>
                <Pressable
                    onPress={() => navigation.navigate('MainTimeTracking')}
                >
                    <FontAwesome6 name="chevron-left" size={24} color={colorSet.timeTracker.white} />
                </Pressable>
                <Text style={{ ...fontSet.timeTracker.h2Bold, color: colorSet.timeTracker.white, marginLeft: 110 }}>Add</Text>
                {/* <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h4Bold }}>Done</Text> */}
            </View>
            <View style={{ ...backgroundBlackWidget, flexDirection: 'column', gap: 10 }}>
                <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h4Bold }}>Name:</Text>
                <TextInput value={name} onChangeText={text => setName(text)} placeholderTextColor={colorSet.timeTracker.softGray} placeholder='Do housework' style={styles.input} />
            </View>
            <View style={{ ...backgroundBlackWidget, flexDirection: 'column', gap: 10 }}>
                <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h4Bold }}>Description:</Text>
                <TextInput value={description} onChangeText={text => setDescription(text)} placeholderTextColor={colorSet.timeTracker.softGray} placeholder='Do housework before 6pm tonight' style={styles.input} />
            </View>
            <View style={{ ...backgroundBlackWidget, flexDirection: 'column', gap: 10 }}>
                <Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h4Bold }}>Think of tag(s):</Text>
                <TextInput value={tag1} onChangeText={text => setTag1(text)} placeholderTextColor={colorSet.timeTracker.softGray} placeholder='Important' style={styles.input} />
                <TextInput value={tag2} onChangeText={text => setTag2(text)} placeholderTextColor={colorSet.timeTracker.softGray} placeholder='Quick' style={styles.input} />
            </View>
            <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                    { padding: 10, ...rounded.md, backgroundColor: colorSet.timeTracker.violet, ...centercenter, marginVertical: 20 },
                    pressed && { opacity: 0.8 }
                ]}
            ><Text style={{ color: colorSet.timeTracker.white, ...fontSet.timeTracker.h4Bold }}>Start Tracking</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    input: { paddingLeft: 10, color: colorSet.timeTracker.white, borderWidth: 1, borderColor: colorSet.timeTracker.softGray, padding: 5, ...rounded.sm }
})

export default AddNewActivityScreen