import { Image, View, Text } from "react-native";
import {styles} from "./Constants/style";

export default function DetailsScreen(){
    return(
        <View style={styles.DetailsBackground}>
            <Text>Details des recettes</Text>
        </View>
    );
}