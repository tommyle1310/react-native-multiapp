import { Pressable, StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import * as CSS from '../../constants/css';
import { convertArrToString, evaluateExpression } from '../../utils/Calculator/function';
import Txt from '../../components/commonComponents/Txt';
import Btn from '../../components/Calculator/Btn';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const { background, centercenter, colorSet } = CSS;

const MainCalculatorScreen = () => {
    const arr = useSelector(state => state.calc.arr);
    const result = useSelector(state => state.calc.result);
    const memoizedArr = useMemo(() => arr, [arr]); // Memoize arr using useMemo


    const [mainLine, setMainLine] = useState('');
    const [subLine1, setSubLine1] = useState('');
    const [query, setQuery] = useState([]);


    useEffect(() => {
        if (memoizedArr.length > 0) {
            let arrExpression = []; // Create an array to accumulate items
            memoizedArr.forEach((item, i) => {
                if (item === 'clear') {
                    arrExpression = []
                    setMainLine('')
                    setSubLine1('')
                }
                else arrExpression.push(item); // Accumulate items
            });
            setQuery(arrExpression); // Update the state with accumulated array
        } else if (memoizedArr.length < 9) {
            setSubLine1('')

        }
    }, [memoizedArr]);

    useEffect(() => {
        if (query.length > 9) {
            setMainLine('')
            setSubLine1(convertArrToString(query))
        } else {
            setSubLine1('')
            setMainLine(convertArrToString(query))
        }
    }, [query])

    useEffect(() => {
        setMainLine(result)
    }, [result])


    const styleExpression = (item, i) => {
        switch (item) {
            case '*':
                return <MaterialIcons key={i} name="clear" size={42} color={colorSet.calculator.blue} />;
            case '/':
                return <FontAwesome5 key={i} name="divide" size={24} color={colorSet.calculator.blue} />;
            case '+':
                return <Entypo name="plus" size={24} color={colorSet.calculator.blue} />;
            case '-':
                return <Entypo name="minus" size={24} color={colorSet.calculator.blue} />;
            case '%':
                return <Feather name="percent" size={24} color={colorSet.calculator.darkGreen} />;
            default:
                return <Txt key={i} text={item} size={54} />;
        }
    };
    return (
        <View style={{ ...background, gap: 10, padding: 0 }}>
            <View style={{ height: 300, backgroundColor: colorSet.calculator.black, padding: 15, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'column', }}>
                    <View><Txt size={36} text={subLine1} /></View>
                    <View><Txt size={54} text={mainLine} /></View>
                </View>

            </View>
            <View style={{ gap: 20, flex: 1, backgroundColor: colorSet.calculator.lightDark, padding: 15 }}>

                <View style={styles.row}>
                    <Btn color={colorSet.calculator.darkGreen} text={'C'} value={'clear'} />
                    <Btn color={colorSet.calculator.softGreen} text={<Feather name="percent" size={24} color={colorSet.calculator.darkGreen} />} value={'%'} />
                    <Btn color={colorSet.calculator.softGreen} text={<FontAwesome6 name="plus-minus" size={24} color={colorSet.calculator.darkGreen} />} value={'plus-minus'} />
                    <Btn color={colorSet.calculator.gray} text={<FontAwesome5 name="divide" size={24} color={colorSet.calculator.blue} />} value={'/'} />

                </View>
                <View style={styles.row}>
                    <Btn text={7} value={7} />
                    <Btn text={8} value={8} />
                    <Btn text={9} value={9} />
                    <Btn color={colorSet.calculator.gray} text={<MaterialIcons name="clear" size={24} color={colorSet.calculator.blue} />} value={'*'} />

                </View>
                <View style={styles.row}>
                    <Btn text={4} value={4} />
                    <Btn text={5} value={5} />
                    <Btn text={6} value={6} />
                    <Btn color={colorSet.calculator.gray} text={<Entypo name="minus" size={24} color={colorSet.calculator.blue} />} value={'-'} />
                </View>
                <View style={styles.row}>
                    <Btn text={1} value={1} />
                    <Btn text={2} value={2} />
                    <Btn text={3} value={3} />
                    <Btn color={colorSet.calculator.gray} text={<Entypo name="plus" size={24} color={colorSet.calculator.blue} />} value={'+'} />
                </View>
                <View style={styles.row}>
                    <Btn text={'.'} value={'.'} />
                    <Btn text={0} value={0} />
                    <Btn text={<Feather name="delete" size={24} color={colorSet.calculator.white} />} value={'delete'} />
                    <Btn color={colorSet.calculator.blue} text={<FontAwesome5 name="equals" size={24} color={colorSet.calculator.white} />} value={'equal'} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MainCalculatorScreen;

// const expression = "pow(16, 1/12)";
// const result = evaluateExpression(expression);