import { getMealsPreview, mealItem, mealPreview, retypeMeal } from "../Constants/types";
import { axiosInstance } from "./axios";

export async function getRecipeByName(name: string): Promise<mealPreview[]> {
    const apiResults = await axiosInstance.get("/search.php", {
        params: {
            s: name,
        }
    })
    return getMealsPreview(apiResults.data?.meals ?? []);
}

export async function getRecipeByArea(area: string): Promise<mealPreview[]> {
    const apiResults = await axiosInstance.get("/filter.php", { 
        params: {
            a: area,
        } 
    });
    return getMealsPreview(apiResults.data?.meals ?? []);
}

export async function getRecipeByCategory(category : string): Promise<mealPreview[]> {
    const apiResults = await axiosInstance.get('filter.php', {
        params:{
            c: category || null,
        }
    });
    return getMealsPreview(apiResults.data?.meals ?? []);
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

export async function getMealDetails(id: number): Promise<mealItem[]>{
    const apiResults = await axiosInstance.get("/lookup.php",{
        params:{
            i: String(id)
        }
    })
    return retypeMeal(apiResults.data?.meals ?? [])
}