import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import * as CSS from '../../constants/css';
import Txt from '../../components/commonComponents/Txt';
import Btn from '../../components/commonComponents/Btn';
import logo from '../../../assets/images/logo.png'
import logoDark from '../../../assets/images/logo_dark.png'
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../../Navigation/NavigationRef';

const { colorSet, background, justifyCenter, itemsCenter } = CSS;

const AuthForm = ({ title, titleDescription, onTap }) => {
    const navigation = useNavigation()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [usernameFocused, setUsernameFocused] = useState(false);

    const handlePressOut = () => {
        setEmailFocused(false);
        setPasswordFocused(false);
        setConfirmPasswordFocused(false);
        setUsernameFocused(false);
    };



    return (
        <TouchableWithoutFeedback onPress={handlePressOut}>
            <View style={{ ...background, ...styles.background }}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <Image source={logoDark} style={{ resizeMode: 'contain', alignSelf: 'center', borderWidth: 1, borderColor: colorSet.auth.dark, borderRadius: 9999 }} />
                    <Txt text={title} size={26} weight={800} />
                    <Txt text={titleDescription} size={18} weight={400} color={colorSet.auth.gray} />
                    <View style={{ height: 20 }}></View>
                    <View style={{ flex: 1 }}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.input,
                                (pressed || emailFocused) ? { backgroundColor: colorSet.auth.dark } : null
                            ]}
                            onPress={() => setEmailFocused(true)}
                        >
                            <View style={{ flexDirection: 'column', ...itemsCenter }}>
                                <Feather name="mail" size={24} color={colorSet.auth.white} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Txt text={"Email"} />
                                <TextInput
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    placeholder='user123@gmail.com'
                                    placeholderTextColor={colorSet.auth.gray}
                                    style={{ color: colorSet.auth.white, fontSize: 15, paddingVertical: 10, }}
                                    onFocus={() => setEmailFocused(true)}
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                        </Pressable>
                        {title !== 'Log In' &&
                            <>
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.input,
                                        (pressed || usernameFocused) ? { backgroundColor: colorSet.auth.dark } : null
                                    ]}
                                    onPress={() => setUsernameFocused(true)}
                                >
                                    <View style={{ flexDirection: 'column', ...itemsCenter }}>
                                        <AntDesign name="user" size={24} color={colorSet.auth.white} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Txt text={"Username"} />
                                        <TextInput
                                            autoCorrect={false}
                                            autoCapitalize='none'
                                            placeholder='Thomas'
                                            placeholderTextColor={colorSet.auth.gray}
                                            style={{ color: colorSet.auth.white, fontSize: 15, paddingVertical: 10, }}
                                            onFocus={() => setUsernameFocused(true)}
                                            value={username}
                                            onChangeText={setUsername}
                                        />
                                    </View>
                                </Pressable>

                            </>
                        }
                        <Pressable
                            style={({ pressed }) => [
                                styles.input,
                                (pressed || passwordFocused) ? { backgroundColor: colorSet.auth.dark } : null
                            ]}
                            onPress={() => setPasswordFocused(true)}
                        >
                            <View style={{ flexDirection: 'column', ...itemsCenter }}>
                                <AntDesign name="lock1" size={26} color={colorSet.auth.white} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Txt text={"Password"} />
                                <TextInput
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    placeholder='*******'
                                    placeholderTextColor={colorSet.auth.gray}
                                    style={{ color: colorSet.auth.white, fontSize: 15, paddingVertical: 10, }}
                                    secureTextEntry={true}
                                    onFocus={() => setPasswordFocused(true)}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>
                        </Pressable>

                        {title !== 'Log In' &&
                            <>
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.input,
                                        (pressed || confirmPasswordFocused) ? { backgroundColor: colorSet.auth.dark } : null
                                    ]}
                                    onPress={() => setConfirmPasswordFocused(true)}
                                >
                                    <View style={{ flexDirection: 'column', ...itemsCenter }}>
                                        <AntDesign name="lock1" size={26} color={colorSet.auth.white} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Txt text={"Confirm password"} />
                                        <TextInput
                                            autoCorrect={false}
                                            autoCapitalize='none'
                                            placeholder='*******'
                                            placeholderTextColor={colorSet.auth.gray}
                                            style={{ color: colorSet.auth.white, fontSize: 15, paddingVertical: 10, }}
                                            secureTextEntry={true}
                                            onFocus={() => setConfirmPasswordFocused(true)}
                                            value={confirmPassword}
                                            onChangeText={setConfirmPassword}
                                        />
                                    </View>
                                </Pressable>
                            </>
                        }

                        <View style={{ height: 20 }}></View>
                        <Btn onTap={() => onTap({ email, password, username, confirmPassword })} text={title} height={50} width={200} rounded={20} center />

                        <Pressable style={{ marginTop: 10 }} >
                            <Txt text={'Forgot password?'} color={colorSet.auth.primary} center />
                        </Pressable>
                    </View>

                    <View style={{ ...justifyCenter, gap: 10 }}>
                        <Txt text={title === 'Log In' ? `Don't have an account?` : 'Already have an account?'} color={colorSet.auth.gray} />
                        <Pressable
                            onPress={() => title === 'Log In' ? navigation.navigate('Signup') : navigation.navigate('Signin')}
                            style={({ pressed }) => [
                                pressed && { opacity: 0.8 }
                            ]}
                        >
                            <Txt text={title === 'Log In' ? 'Sign up' : 'Sign in'} color={colorSet.auth.primary} center />
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colorSet.auth.background
    },
    input: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colorSet.auth.dark,
        marginVertical: 10,
        gap: 15,
        justifyContent: 'flex-start',
        borderRadius: 14,
        padding: 10
    }
});

export default AuthForm;
