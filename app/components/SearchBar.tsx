import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { mealPreview } from "../Constants/types";
import { getRecipeByName } from "../services/apiservices";
import { styles } from "../Constants/style";

export function Searchbar({ onResults }: { onResults: (meals: mealPreview[]) => void }){
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function searchRecipeByName() {
            if (!search.trim()){
                onResults([]);
                return;
            }

            try{
                const meals = await getRecipeByName(search);
                onResults(meals);
            }
            catch (error) {
                console.log(`An error occured while searching a meal by name : ${error}`);
            }
        }

        searchRecipeByName();
    }, [search, onResults])
    
    return (
        <TextInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Rechercher"
        style={styles.SearchBar}
        />
    );
}