import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainTimeTrackingScreen from './screens/TimeTrackingApp/MainTimeTrackerScreen'
import { NavigationContainer } from '@react-navigation/native'
import DetailTimeTrackerScreen from './screens/TimeTrackingApp/DetailTimeTrackerScreen'


// bottom tab time tracker
const BottomTabTimeTracker = createBottomTabNavigator()
const BottomTimeTracking = () => {
    return <BottomTabTimeTracker.Navigator screenOptions={{ headerShown: false }}>
        <BottomTabTimeTracker.Screen component={StackTimeTracking} name={'Main'} />
        <BottomTabTimeTracker.Screen component={MainTimeTrackingScreen} name={'MainTimeTrackingScreen2'} />
    </BottomTabTimeTracker.Navigator>
}

//  stack time tracker
const stackTabTimeTracker = createNativeStackNavigator()
const StackTimeTracking = () => {
    return <stackTabTimeTracker.Navigator screenOptions={{ headerShown: false }}>
        <stackTabTimeTracker.Screen component={MainTimeTrackingScreen} name={'MainTimeTracking'} />
        <stackTabTimeTracker.Screen component={DetailTimeTrackerScreen} name={'DetailTimeTracking'} />
    </stackTabTimeTracker.Navigator>
}

export default Navigation = () => {
    return <NavigationContainer>
        <BottomTimeTracking />
    </NavigationContainer>
}