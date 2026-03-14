import { mealItem, retypeMeal, retypeMeals } from "../Constants/types";
import { axiosInstance } from "./axios";
import { addMeals } from "./dbService";

export async function getRecipeByName(name: string): Promise<mealItem[]> {
    const apiResults = await axiosInstance.get("/search.php", {
        params: {
            s: name,
        }
    })

    addMeals(apiResults.data?.meals ?? []);
    return retypeMeals(apiResults.data?.meals ?? []);
}

export async function getRecipeByArea(area: string): Promise<mealItem[]> {
    const apiResults = await axiosInstance.get("/filter.php", { 
        params: {
            a: area,
        } 
    });

    addMeals(apiResults.data?.meals ?? []);
    return retypeMeals(apiResults.data?.meals ?? []);
}

export async function getRecipeByCategory(category : string): Promise<mealItem[]> {
    const apiResults = await axiosInstance.get('filter.php', {
        params:{
            c: category || null,
        }
    });
    
    addMeals(apiResults.data?.meals ?? []);
    return retypeMeals(apiResults.data?.meals ?? []);
}

export async function getRecipeDetails(id: number): Promise<mealItem | null>{
    const apiResults = await axiosInstance.get("/lookup.php",{
        params:{
            i: String(id)
        }
    });

    addMeals(apiResults.data?.meals ?? []);
    return retypeMeal(apiResults.data?.meals[0] ?? []) ;
}

export async function getFilters(area: boolean = false, category: boolean = false): Promise<string[]>{
    const defaultParam = "list";
    if (area) {
        const apiResults = await axiosInstance.get('/list.php', {
            params:{
                a: defaultParam,
            }
        });
        return apiResults.data;
    }
    else if (category) {
        const apiResults = await axiosInstance.get('/list.php', {
            params:{
                c: defaultParam,
            }
        });
        return apiResults.data;
    }
    return [];
}
