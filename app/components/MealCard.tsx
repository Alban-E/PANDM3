import { Text, TouchableOpacity, Image } from "react-native";
import { mealPreview } from "../Constants/types";
import { router } from "expo-router";
import { styles } from "../Constants/style";

export function MealCard({meal}: { meal: mealPreview}){
    return(
        <TouchableOpacity onPress={() => router.push(`/Details?id=${meal.idMeal}`)} style={styles.MealCard}>
            <Text style={styles.MealCardName}>{meal.Meal}</Text>
            <Image 
            source={{ uri: meal.MealThumb }}
            style={styles.MealcardImage}
            />
        </TouchableOpacity>
    );
}