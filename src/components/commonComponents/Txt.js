import { View, Text } from 'react-native'
import React from 'react'

const Txt = ({ size = 14, color = 'white', text, weight = 500, center }) => {
    const isCenter = center ? { alignSelf: 'center' } : null
    return (
        <Text style={{ color, fontSize: size, fontWeight: weight, ...isCenter }}>{text}</Text>
    )
}

export default Txt