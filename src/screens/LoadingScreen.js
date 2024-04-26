import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import { useDispatch } from 'react-redux';
import { persistLogin } from '../store/features/authSlice';
export default App = () => {
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const validateToken = async () => {
            const check = await dispatch(persistLogin())
            if (check) {
                setVisible(false)
            }
        }
        validateToken()



    }, []);

    return (
        <AnimatedLoader
            visible={visible}
            overlayColor="rgba(255,255,255,0.75)"
            animationStyle={styles.lottie}
            speed={1}>
            <Text>Tommease is loading...</Text>
        </AnimatedLoader>
    );
}
const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100,
    },
});
