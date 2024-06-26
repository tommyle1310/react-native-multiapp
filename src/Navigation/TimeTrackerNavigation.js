// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainTimeTrackingScreen from '../screens/TimeTrackingApp/MainTimeTrackerScreen'
import DetailTimeTrackerScreen from '../screens/TimeTrackingApp/DetailTimeTrackerScreen'
import StatisticsScreen from '../screens/TimeTrackingApp/StatisticsScreen'
import AddNewActivityScreen from '../screens/TimeTrackingApp/AddNewActivityScreen'
import DetailActivityScreen from '../screens/TimeTrackingApp/DetailActivityScreen'
import { Sidebar } from './SideNavigation'


//  stack time tracker
const stackTabTimeTracker = createNativeStackNavigator()
export const StackTimeTracking = () => {
    return <stackTabTimeTracker.Navigator screenOptions={{ headerShown: false }}>
        <stackTabTimeTracker.Screen component={Sidebar} name={'Sidebar'} />
        <stackTabTimeTracker.Screen component={DetailTimeTrackerScreen} name={'DetailTimeTracking'} />
        <stackTabTimeTracker.Screen component={StatisticsScreen} name={'StatisticsTimeTracking'} />
        <stackTabTimeTracker.Screen component={AddNewActivityScreen} name={'AddNewTimeTracking'} />
        <stackTabTimeTracker.Screen component={DetailActivityScreen} name={'DetailActivity'} />
    </stackTabTimeTracker.Navigator>
}