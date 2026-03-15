import { View, Text, FlatList } from "react-native";
import {styles} from "./Constants/style";
import { useEffect, useState } from "react";
import { Searchbar } from "./components/SearchBar";
import { mealPreview } from "./Constants/types";
import { setupDB } from "./services/dbService";
import { MealCard } from "./components/MealCard";
import { useAnyMeals, useMealByArea, useMealByCategory, useMealByName } from "./hooks/useMeals";
import { Filters } from "./components/Filters";
import { SplashScreenComponent } from "./components/SplashScreen";

export default function Index(){
    const [meals, setMeals] = useState<mealPreview[]>([]);
    const [currentFilters, setCurrentFilters] = useState<string[]>(["French","area"])
    const [loadedMeals, setLoadedMeals] = useState(10);
    const [HasMoreMeals, setHasMoreMeals] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getInitialResults() {
            try {
                setupDB();
                const results = await useAnyMeals();

                setMeals(results);
                setHasMoreMeals(false);
            }
            catch (error) {
                console.error(`An error occured during the initial loading: ${error}`);
                setLoading(false);
            }
            finally{setLoading(false);}
        }
        getInitialResults();
    }, []);

    const [, forceUpdate] = useState(0);

    useEffect(() => {
        if (!loading) {
            forceUpdate(n => n + 1);
        }
    }, [loading]);
    
    const loadMore = async () =>{
        if (loading || !HasMoreMeals) {return;}

        setLoading(true);
        try {
            let results:mealPreview[] = [];
            switch (currentFilters[1]) {
                case "area":
                    results = await useMealByArea(currentFilters[0], loadedMeals)
                    break;
                case "category":
                    results = await useMealByCategory(currentFilters[0], loadedMeals)
                    break
                case "name":
                    results = await useMealByName(currentFilters[0], loadedMeals)
                    break;
                default:
                    break;
            }
            
            setMeals([...meals, ...results]);
            setLoadedMeals(loadedMeals + 10);
            setHasMoreMeals(results.length >= 10)
            
        } catch (error) {
            console.error(`An error occured during the infinite scroll loading: ${error}`);
        }
        finally {setLoading(false);}
    }

    const handleMealsChange = (newMeals: mealPreview[], filterValue: string, filterType: "area" | "category" | "name") => {
        setMeals(newMeals);
        setLoadedMeals(10);
        setCurrentFilters([filterValue, filterType]);
        setHasMoreMeals(newMeals.length >= 10);
    };


    return(
        loading ? (
            <SplashScreenComponent/>
        ): (
        <View style={styles.HomeBackground}>
            <Text style={styles.HomeTitle}>Page D'accueil</Text>
            <Searchbar onResults={handleMealsChange}/>
            <Filters onMealsChange={handleMealsChange}/>
            <FlatList
            data={meals}
            renderItem={({item}) => <MealCard meal={item} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item.idMeal)}
            style={{flex:1}}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5} 
            ListFooterComponent={loading ? <Text>Chargement...</Text> : null}
            />
        </View>

        )
    );
}