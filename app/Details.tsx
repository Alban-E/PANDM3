import { Image, View, Text } from "react-native";
import {styles} from "./Constants/style";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { mealItem } from "./Constants/types";
import { useMealById } from "./hooks/useMeals";

export default function DetailsScreen(){
    const {id} = useLocalSearchParams();
    const [meal, setMeal] = useState< mealItem | null>(null);
    
    useEffect(() => {
        async function getDetails() {
            try {
                let result: mealItem | null = await useMealById(Number(id));
                setMeal(result);            
            } catch (error) {
                console.error(`An error Occured while searching details of the recipe: ${error}`);
            }
        }
        getDetails();
    }, [id]);

    return(
        <View style={styles.DetailsBackground}>
            <Text style={styles.MealTitle}>{meal?.Meal}</Text>
            <Text style={styles.MealCategory}>{meal?.Category}</Text>
            <Text style={styles.MealArea}>{meal?.Area}</Text>
            <Text style={styles.MealInstructions}>{meal?.Instructions}</Text>
            <Image source={{uri: meal?.MealThumb}} style={styles.MealThumb}/>
            <Text style={styles.MealTags}>{meal?.Tags}</Text>
            <Text style={styles.MealVideo}>{meal?.Youtube}</Text>
            <Text style={styles.MealIngredients}>{meal?.Ingredients}</Text>
            <Text style={styles.MealMeasures}>{meal?.Measures}</Text>
        </View>
    );
}