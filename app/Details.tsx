import { Image, View, Text, TouchableOpacity, ScrollView } from "react-native";
import {styles} from "./Constants/style";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { mealItem } from "./Constants/types";
import { useMealById } from "./hooks/useMeals";
import { WebView } from "react-native-webview";

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

    return (
        <View style={styles.DetailsBackground}>
            <TouchableOpacity style={styles.DetailsBackButton} onPress={() => router.back()}>
                <Text style={styles.DetailsBackButtonText}>← Retour</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                <Text style={styles.MealTitle}>{meal?.Meal}</Text>
                <Text style={styles.MealCategory}>{meal?.Category}</Text>
                <Text style={styles.MealArea}>{meal?.Area}</Text>
                <Image source={{uri: meal?.MealThumb}} style={styles.MealThumb}/>
                <Text style={styles.MealTags}>{meal?.Tags}</Text>
                {meal?.Youtube && (
                    <WebView
                        style={styles.MealVideo}
                        source={{ uri: meal.Youtube.replace("watch?v=", "embed/") }}
                        allowsFullscreenVideo
                    />
                )}
                <Text style={styles.MealIngredients}>{meal?.Ingredients}</Text>
                <Text style={styles.MealMeasures}>{meal?.Measures}</Text>
                <Text style={styles.MealInstructions}>{meal?.Instructions}</Text>
            </ScrollView>
        </View>
);}