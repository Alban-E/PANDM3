import { Image, View, Text } from "react-native";
import {styles} from "./Constants/style";
import { useLocalSearchParams } from "expo-router";

export default function DetailsScreen(){
    const {id} = useLocalSearchParams();
    return(
        <View style={styles.DetailsBackground}>
            <Text>Details des recettes</Text>
        </View>
    );
}