import { View, Text, FlatList } from "react-native";
import {styles} from "./Constants/style";
import { useEffect, useState } from "react";
import { Searchbar } from "./components/SearchBar";
import { mealPreview } from "./Constants/types";
import { setupDB } from "./services/dbService";
import { MealCard } from "./components/MealCard";
import { useMealByArea, useMealByCategory, useMealByName } from "./hooks/useMeals";
import { Filters } from "./components/Filters";
import { SplashScreenComponent } from "./components/SplashScreen";

export default function Index(){
    const [meals, setMeals] = useState<mealPreview[]>([]);
    const [currentFilters, setCurrentFilters] = useState<string[]>(["French","area"])
    const [loadedMeals, setLoadedMeals] = useState(10);
    const [HasMoreMeals, setHasMoreMeals] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const uniqueMeals = (list: mealPreview[]) => 
    list.filter((meal, index, self) => 
        self.findIndex(m => m.idMeal === meal.idMeal) === index
    );


    useEffect(() => {
        async function getInitialResults() {
            try {
                setupDB();
                const { meals: results, hasMore } = await useMealByArea("French", 0);
                setMeals(uniqueMeals(results));
                setHasMoreMeals(hasMore);
            }
            catch (error) {
                console.error(`An error occured during the initial loading: ${error}`);
                setInitialLoading(false);
            }
            finally{setInitialLoading(false);}
        }
        getInitialResults();
    }, []);

    
const loadMore = async () => {
    if (initialLoading || loadingMore || !HasMoreMeals) {return;}

    setLoadingMore(true);
    try {
        let results: mealPreview[] = [];
        let hasMore: boolean = false;

        switch (currentFilters[1]) {
            case "area":
                ({ meals: results, hasMore } = await useMealByArea(currentFilters[0], loadedMeals));
                break;
            case "category":
                ({ meals: results, hasMore } = await useMealByCategory(currentFilters[0], loadedMeals));
                break;
            case "name":
                ({ meals: results, hasMore } = await useMealByName(currentFilters[0], loadedMeals));
                break;
            default:
                break;
        }

        const uniqueResults = results.filter(
            newMeal => !meals.some(existing => existing.idMeal === newMeal.idMeal)
        );
        setMeals(uniqueMeals([...meals, ...uniqueResults]));
        setLoadedMeals(loadedMeals + 10);
        setHasMoreMeals(hasMore);
        } catch (error) {
            console.error(`An error occured during the infinite scroll loading: ${error}`);
        } finally {
            setLoadingMore(false);
        }
    }

    const handleMealsChange = (newMeals: mealPreview[], filterValue: string, filterType: "area" | "category" | "name", hasMore: boolean) => {
        setMeals(uniqueMeals(newMeals));
        setLoadedMeals(newMeals.length);
        setCurrentFilters([filterValue, filterType]);
        setHasMoreMeals(hasMore);
    };

    return(
        initialLoading ? (
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
            ListFooterComponent={loadingMore ? <Text style={{alignSelf: "center", marginBottom: 30}}>Chargement...</Text> : null}
            />
        </View>

        )
    );
}