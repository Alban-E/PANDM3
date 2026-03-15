import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { getFilters } from "../services/apiservices";
import { useMealByArea, useMealByCategory } from "../hooks/useMeals";
import { mealPreview } from "../Constants/types";
import { styles } from "../Constants/style";

export function Filters({ onMealsChange }: { onMealsChange: (meals: mealPreview[], filterValue: string, filterType: "area" | "category" | "name", hasMore: boolean) => void }){
    const [areas, setAreas] = useState([""]);
    const [categories, setCategories] = useState([""]);

    useEffect(() => {
        async function setFilters() {
            const results = await getFilters(true, true);

            setAreas(results[0]);
            setCategories(results[1]);
        }
        setFilters();
    }, [])

    const handleAreaPress = async (area: string) => {
        const { meals, hasMore } = await useMealByArea(area, 0);
        onMealsChange(meals, area, "area", hasMore);
    };

    const handleCategoryPress = async (category: string) => {
        const { meals, hasMore } = await useMealByCategory(category, 0);
        onMealsChange(meals, category, "category", hasMore);
    };

    return (
        <View style={styles.FiltersContainer}>
            <FlatList 
            data={areas}
            style={styles.FiltersList}
            showsHorizontalScrollIndicator={false}
            renderItem ={({item}) => 
                <TouchableOpacity 
                onPress={()=>handleAreaPress(item)}
                style={styles.FiltersButton}>
                    <Text>{item}</Text>
                </TouchableOpacity>}
            horizontal = {true}
            />

            <FlatList
            data={categories}
            style={styles.FiltersList}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => 
                <TouchableOpacity 
                onPress={() => handleCategoryPress(item)}
                style={styles.FiltersButton}>
                    <Text>{item}</Text>
                </TouchableOpacity>}
            horizontal = {true}
            />  
        </View>
    );
}