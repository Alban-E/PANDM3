import { Image, View, Text } from "react-native";
import {styles} from "../Constants/Style";

export function DetailsScreen(){
    return(
        <View style={styles.DetailsBackground}>
            <Text>Details des recettes</Text>
        </View>
    );
}