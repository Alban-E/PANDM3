import { View, Image, Text } from "react-native";
import {styles} from "../Constants/style";

export function SplashScreenComponent(){
    return(
        <View style={styles.SplashBackground}>
            <Image source={require('../../assets/icon.png')} style={styles.SplashLogo}/>
            <Text style={styles.loadingTxt}>Loading . . .</Text>
        </View>
);
}