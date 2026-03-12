import { Image, View, Text } from "react-native";
import {styles} from "./Constants/style";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getMealDetails } from "./services/apiservices";
import { mealItem } from "./Constants/types";

export default function DetailsScreen(){
    const {id} = useLocalSearchParams();
    const [meal, setMeal] = useState< mealItem | null>(null);
    
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await getMealDetails(Number(id));
                setMeal(result);            
            } catch (error) {
                console.error(`An error Occured while searching details of the recipe: ${error}`);
            }
        }
        getDetails();
    }, [id]);

    return(
        <View style={styles.DetailsBackground}>
            <Text>{meal?.Meal}</Text>
            <Text>{meal?.Category}</Text>
            <Text>{meal?.Area}</Text>
            <Text>{meal?.Instructions}</Text>
            <Image source={{uri: meal?.MealThumb}}/>
            <Text>{meal?.Tags}</Text>
            <Text>{meal?.Youtube}</Text>
            <Text>{meal?.Ingredients?.join(', ')}</Text>
            <Text>{meal?.Measures?.join(', ')}</Text>
        </View>
    );
}