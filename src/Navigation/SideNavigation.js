// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer'
import MainTimeTrackingScreen from '../screens/TimeTrackingApp/MainTimeTrackerScreen'
import DetailTimeTrackerScreen from '../screens/TimeTrackingApp/DetailTimeTrackerScreen'
import { Text, View } from 'react-native'
import MainCalculatorScreen from '../screens/Calculator/MainCalculatorScreen'
import * as CSS from '../constants/css';
import { useDispatch } from 'react-redux'
import { signout } from '../store/features/authSlice'


const { colorSet } = CSS

//  stack time tracker
const sidebarTab = createDrawerNavigator()
export const Sidebar = () => {
    const dispatch = useDispatch()


    return <sidebarTab.Navigator
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => {
            const { routeNames, index } = props.state
            const focused = routeNames[index]


            return (
                <DrawerContentScrollView {...props} style={{ backgroundColor: colorSet.auth.dark }} >
                    <DrawerItem
                        label={'Time Tracker'}
                        onPress={() => props.navigation.navigate('MainTimeTracking')}
                        activeBackgroundColor={colorSet.timeTracker.violet}
                        inactiveTintColor={colorSet.auth.white}
                        activeTintColor={colorSet.timeTracker.white}
                        focused={focused === 'MainTimeTracking'}

                    />
                    <DrawerItem
                        label={'Calculator'}
                        onPress={() => props.navigation.navigate('MainCalculator')}
                        activeBackgroundColor={colorSet.timeTracker.violet}
                        inactiveTintColor={colorSet.auth.white}
                        activeTintColor={colorSet.timeTracker.white}
                        focused={focused === 'MainCalculator'}

                    />
                    <DrawerItem
                        label={'Log out'}
                        onPress={() => dispatch(signout())}
                        activeBackgroundColor='red'
                        inactiveTintColor={colorSet.auth.white}
                        focused={focused === 'MainCalculator'}
                    />
                </DrawerContentScrollView>
            )
        }}
    >
        <sidebarTab.Screen component={MainTimeTrackingScreen} name={'MainTimeTracking'} />
        <sidebarTab.Screen component={MainCalculatorScreen} name={'MainCalculator'} />
    </sidebarTab.Navigator>
}