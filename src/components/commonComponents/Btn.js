import { Pressable, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import * as CSS from '../../constants/css'

const { colorSet, centercenter } = CSS

const Btn = ({ onTap,
    text,
    textSize = 20,
    color = colorSet.auth.dark,
    bgColor = colorSet.auth.primary,
    width = '100%',
    height = 100,
    rounded = 8,
    pressedBgColor = '#06988d',
    center
}) => {
    const isCenter = center === true ? { alignSelf: 'center' } : null
    return (
        <Pressable
            onPress={onTap}
            style={({ pressed }) => [
                { backgroundColor: bgColor, width, height, borderRadius: rounded, ...centercenter, ...isCenter },
                pressed && { backgroundColor: pressedBgColor }
            ]}
        >
            <Text style={{ color, fontWeight: 700, fontSize: textSize }}>{text}</Text>
        </Pressable>
    )
}

export default Btn