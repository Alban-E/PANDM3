import { View, Image, Text, TouchableOpacity } from "react-native";
import {styles} from "./Constants/style";
import { useRouter,  } from "expo-router";

export default function Index(){
    const router = useRouter();
    return(
        <View style={styles.SplashBackground}>
            <Image source={require('../assets/icon.png')} style={styles.SplashLogo}/>
            <Text style={styles.loadingTxt}>Loading . . .</Text>
            <TouchableOpacity style={styles.loadingTxt} onPress={() => router.push("/Home")} >
                <Text>Home</Text>
            </TouchableOpacity>
        </View>
);
}