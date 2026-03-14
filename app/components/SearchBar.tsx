import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { mealPreview } from "../Constants/types";
import { styles, Colors } from "../Constants/style";
import { useMealByName } from "../hooks/useMeals";

export function Searchbar({ onResults }: { onResults: (meals: mealPreview[]) => void }){
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function searchRecipeByName() {
            if (!search.trim()){
                onResults([]);
                return;
            }

            try{
                const meals = await useMealByName(search);
                onResults(meals);
            }
            catch (error) {
                console.error(`An error occured while searching a meal by name : ${error}`);
            }
        }

        searchRecipeByName();
    }, [search, onResults])
    
    return (
        <TextInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Rechercher"
        placeholderTextColor={Colors.darkText}
        style={styles.SearchBar}
        />
    );
}