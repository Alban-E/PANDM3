import { View, Text } from "react-native";
import {styles} from "./Constants/style";

export default function HomeScreen(){
    return(
        <View style={styles.HomeBackground}>
            <Text>Page D'accueil</Text>
        </View>
    );
}