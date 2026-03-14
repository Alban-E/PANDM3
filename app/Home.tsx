import { View, Text, FlatList } from "react-native";
import {styles} from "./Constants/style";
import { useEffect, useState } from "react";
import { Searchbar } from "./components/SearchBar";
import { mealPreview } from "./Constants/types";
import { setupDB } from "./services/dbService";
import { MealCard } from "./components/MealCard";
import { useMealByArea } from "./hooks/useMeals";


export default function HomeScreen(){
    const [meals, setMeals] = useState<mealPreview[]>([]);

    useEffect(() => {
        setupDB();

        async function getInitialResults() {
            try{
                const results = await useMealByArea("French");
                setMeals(results);
            }
            catch (error) {
                console.error(`An error occured during the initial loading: ${error}`)
            }
        }
        getInitialResults();
    }, []);
    
    return(
        <View style={styles.HomeBackground}>
            <Text style={styles.HomeTitle}>Page D'accueil</Text>
            <Searchbar onResults={setMeals}/>
            <FlatList
            data={meals}
            renderItem={({item}) => <MealCard meal={item} />}
            keyExtractor={(item) => String(item.idMeal)}
            style={{flex:1}}
            />
        </View>
    );
}