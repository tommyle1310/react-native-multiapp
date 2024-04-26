// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Signin from '../screens/AuthScreens/Signin'
import Signup from '../screens/AuthScreens/Signup'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'


//  stack auth screens
const stackAuth = createNativeStackNavigator()
export const StackAuthGroup = () => {
    return <stackAuth.Navigator screenOptions={{ headerShown: false }}>
        <stackAuth.Screen component={Signin} name={'Signin'} />
        <stackAuth.Screen component={Signup} name={'Signup'} />
    </stackAuth.Navigator>
}