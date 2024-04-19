import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import * as CSS from '../../constants/css';
const { colorSet, fontSet, margin, padding, justifyCenter, justifyBetween, justifyAround, itemsCenter, centercenter, avatar, rounded } = CSS;


const Tab = ({ selectTabIndex, setSelectTabIndex, data }) => {
    useEffect(() => {
        setSelectTabIndex(0)
    }, [])
    return (
        <View style={{ ...padding.sm, marginVertical: 20, ...rounded.sm, backgroundColor: colorSet.timeTracker.dark, flexDirection: 'row' }}>
            {data.length > 0 && // Added conditional check here
                data.map((item, index) => { // Changed the loop variable to index
                    return (
                        <Pressable key={index} // Use index as key instead of item.id
                            style={({ pressed }) => [
                                selectTabIndex === index ? styles.selectedTab : styles.unSelectedTab, pressed && { opacity: .8 }
                            ]}
                            onPress={() => { setSelectTabIndex(index); item.onTap() }} // Corrected function call here
                        >
                            <Text style={selectTabIndex === index ? { color: colorSet.timeTracker.black, ...fontSet.timeTracker.h5Light } : { color: colorSet.timeTracker.softGray, ...fontSet.timeTracker.h5Light }}>{item.title}</Text>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}


const styles = StyleSheet.create({
    selectedTab: { flex: 1, backgroundColor: colorSet.timeTracker.cyan, paddingVertical: 5, ...rounded.md, ...centercenter },
    unSelectedTab: { flex: 1, paddingVertical: 5, ...rounded.md, ...centercenter },
})

export default Tab