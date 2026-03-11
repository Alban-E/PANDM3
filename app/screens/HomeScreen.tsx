import { View, Text } from "react-native";
import {styles} from "../Constants/Style";

export function HomeScreen(){
    return(
        <View style={styles.HomeBackground}>
            <Text>Page D'accueil</Text>
        </View>
    );
}