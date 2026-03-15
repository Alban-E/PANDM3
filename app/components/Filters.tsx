import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { getFilters } from "../services/apiservices";
import { useMealByArea, useMealByCategory } from "../hooks/useMeals";
import { mealPreview } from "../Constants/types";
import { styles } from "../Constants/style";

export function Filters({ onMealsChange }: { onMealsChange: (meals: mealPreview[], filterValue: string, filterType: "area" | "category" | "name") => void }){
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
        const results = await useMealByArea(area, 0);
        onMealsChange(results, area, "area");
    };

    const handleCategoryPress = async (category: string) => {
        const results = await useMealByCategory(category, 0);
        onMealsChange(results, category, "category");
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