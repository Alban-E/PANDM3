import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { DetailsScreen } from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export function AppNavigation(){
    return (
        <Stack.Navigator
            screenOptions={{headerShown: true}}
            initialRouteName="Splash"
        >
            <Stack.Screen 
                name="Splash" 
                component={SplashScreen}
                options={{title: "Loading"}}
            />
            <Stack.Screen 
                name="Home" 
                component={HomeScreen}
                options={{title: "Home"}}
            />
            <Stack.Screen 
                name="Details" 
                component={DetailsScreen}
                options={{title: "Details"}}
            />
        </Stack.Navigator>
    );
}