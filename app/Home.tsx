import { View, Text, FlatList } from "react-native";
import {styles} from "./Constants/style";
import { useEffect, useState } from "react";
import { getRecipeByArea } from "./services/apiservices";
import { Searchbar } from "./components/SearchBar";
import { mealItem, mealPreview } from "./Constants/types";
import { setupDB } from "./services/dbService";
import { MealCard } from "./components/MealCard";


export default function HomeScreen(){
    const [meals, setMeals] = useState<mealPreview[]>([]);

    useEffect(() => {
        setupDB();

        async function getInitialResults() {
            try{
                const results = await getRecipeByArea("French");
                setMeals(results);
            }
            catch (error) {
                console.log(`An error occured during the initial loading: ${error}`)
            }
        }
        getInitialResults();
    }, []);
    
    return(
        <View style={styles.HomeBackground}>
            <Text>Page D'accueil</Text>
            <Searchbar onResults={setMeals}/>
            <FlatList
            data={meals}
            renderItem={({item}) => <MealCard meal={item} />}
            keyExtractor={(item) => item.idMeal}
            style={{flex:1}}
            />
            <Text>Resultats: {meals.length}</Text>
        </View>
    );
}