import { getMealsPreview, mealItem, mealPreview } from "../Constants/types";
import { getRecipeByArea, getRecipeByCategory, getRecipeByName, getRecipeDetails } from "../services/apiservices";
import { addMeal, addMeals, getMealsByArea, getMealById, getMealsByName, getMealsByCategory } from "../services/dbService";

export async function useMealByName(name:string, amountAlreadyLoaded:number): Promise<mealPreview[]>{
    const dbResult = getMealsByName(name);
    if (dbResult.length === 0) {
        const apiResult = await getRecipeByName(name);
        addMeals(apiResult);
        return getMealsPreview(apiResult.slice(amountAlreadyLoaded, amountAlreadyLoaded + 10));
    }
    return getMealsPreview(dbResult.slice(amountAlreadyLoaded, amountAlreadyLoaded + 10));
}

export async function useMealByCategory(category:string, amountAlreadyLoaded:number): Promise<mealPreview[]>{
    const dbResult = getMealsByCategory(category);
    if (dbResult.length === 0) {
        const apiResult = await getRecipeByCategory(category);
        addMeals(apiResult);
        return getMealsPreview(apiResult.slice(amountAlreadyLoaded, amountAlreadyLoaded + 10));
    }
    return getMealsPreview(dbResult.slice(amountAlreadyLoaded, amountAlreadyLoaded + 10));
}

export async function useMealByArea(area:string, amountAlreadyLoaded:number): Promise<mealPreview[]>{
    const dbResult = getMealsByArea(area);
    if (dbResult.length === 0) {
        const apiResult = await getRecipeByArea(area);
        addMeals(apiResult);
        return getMealsPreview(apiResult.slice(amountAlreadyLoaded, amountAlreadyLoaded + 10))
    }
    return getMealsPreview(dbResult.slice(amountAlreadyLoaded, amountAlreadyLoaded + 10));
}

export async function useMealById(id: number): Promise<mealItem | null> {
    const dbResult = getMealById(id);
    if (!dbResult) {
        const apiResult = await getRecipeDetails(id);
        if (apiResult){
            addMeal(apiResult);
        }
        return apiResult
    }
    return dbResult;
}