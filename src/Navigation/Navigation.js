import { NavigationContainer } from '@react-navigation/native'
import { StackTimeTracking } from './TimeTrackerNavigation'
import { StackAuthGroup } from './AuthNavigation'
import LoadingScreen from '../screens/LoadingScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { setNavigator } from './NavigationRef'
import { Sidebar } from './SideNavigation'


const mainStack = createNativeStackNavigator()
const MainStack = () => {
    return (
        <mainStack.Navigator screenOptions={{ headerShown: false }}>
            <mainStack.Screen name="Loading" component={LoadingScreen} />
            {/* <mainStack.Screen component={Sidebar} name={'Sidebar'} /> */}

            <mainStack.Screen name="TimeTracking" component={StackTimeTracking} />
            <mainStack.Screen name="AuthGroup" component={StackAuthGroup} />
        </mainStack.Navigator>
    );
}




export default Navigation = () => {
    return <NavigationContainer ref={navigator => setNavigator(navigator)}>
        <MainStack />
    </NavigationContainer>
}