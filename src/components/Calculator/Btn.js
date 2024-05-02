import { View, Text, Pressable } from 'react-native'
import React from 'react'
import * as CSS from '../../constants/css'
import Txt from '../commonComponents/Txt'
import { useDispatch, useSelector } from 'react-redux'
import { calculate, clearArr, deleteIndex, pushArr } from '../../store/features/Calculator/calculatorSlice'

const { colorSet, centercenter } = CSS

const Btn = ({ text, onTap, color = colorSet.calculator.softGray, value }) => {
    const arr = useSelector(state => state.calc.arr);

    const dispatch = useDispatch()
    const handleTap = () => {
        if (value === 'clear') {
            dispatch(clearArr())
            dispatch(pushArr({ value }))
        }
        else if (value === 'delete') {
            dispatch(deleteIndex(arr, arr.length - 1)); // Pass arr and the index to delete
        }
        else if (value === 'equal') {
            dispatch(calculate(arr))
            dispatch(clearArr())
        }
        else {
            dispatch(pushArr({ value }))
        }
    }

    return (
        <Pressable
            style={({ pressed }) => [
                { width: 60, height: 60, ...centercenter, backgroundColor: color, borderRadius: 9999 },
                pressed && { opacity: .7 }
            ]}
            onPressOut={() => { handleTap() }}
        >
            <Txt text={text} size={20} />
        </Pressable>
    )
}

export default Btn