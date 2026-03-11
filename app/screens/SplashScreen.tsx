import { View, Image, Text } from "react-native";
import {styles} from "../Constants/Style";

export function SplashScreen(){
    return(
        <View style={styles.SplashBackground}>
            <Image source={require('../../assets/icon.png')}/>
            <Text>Splash Screen</Text>
        </View>
);
}