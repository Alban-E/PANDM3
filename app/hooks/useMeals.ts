import { getMealsPreview, mealItem, mealPreview } from "../Constants/types";
import { getRecipeByArea, getRecipeByCategory, getRecipeByName, getRecipeDetails } from "../services/apiservices";
import { addMeal, addMeals, getMealsByArea, getMealById, getMealsByName, getMealsByCategory, getEveryMeals } from "../services/dbService";

export async function useMealByArea(area: string, amountAlreadyLoaded: number): Promise<{meals: mealPreview[], hasMore: boolean}> {
    const dbResult = getMealsByArea(area);
    const dbTotal = dbResult.length;

    // DB pas encore épuisée
    if (amountAlreadyLoaded < dbTotal) {
        const slice = dbResult.slice(amountAlreadyLoaded, amountAlreadyLoaded + 10);
        return { meals: getMealsPreview(slice), hasMore: true };
    }

    // DB épuisée, on calcule où on en est dans l'API
    const apiOffset = amountAlreadyLoaded - dbTotal;
    const apiResult = await getRecipeByArea(area);
    addMeals(apiResult);
    const slice = apiResult.slice(apiOffset, apiOffset + 10);
    return { meals: getMealsPreview(slice), hasMore: slice.length >= 10 };
}

export async function useMealByCategory(category: string, amountAlreadyLoaded: number): Promise<{meals: mealPreview[], hasMore: boolean}> {
    const dbResult = getMealsByCategory(category);
    const dbTotal = dbResult.length;

    if (amountAlreadyLoaded < dbTotal) {
        const slice = dbResult.slice(amountAlreadyLoaded, amountAlreadyLoaded + 10);
        return { meals: getMealsPreview(slice), hasMore: true };
    }

    const apiOffset = amountAlreadyLoaded - dbTotal;
    const apiResult = await getRecipeByCategory(category);
    addMeals(apiResult);
    const slice = apiResult.slice(apiOffset, apiOffset + 10);
    return { meals: getMealsPreview(slice), hasMore: slice.length >= 10 };
}

export async function useMealByName(name: string, amountAlreadyLoaded: number): Promise<{meals: mealPreview[], hasMore: boolean}> {
    const dbResult = getMealsByName(name);
    const dbTotal = dbResult.length;

    if (amountAlreadyLoaded < dbTotal) {
        const slice = dbResult.slice(amountAlreadyLoaded, amountAlreadyLoaded + 10);
        return { meals: getMealsPreview(slice), hasMore: true };
    }

    const apiOffset = amountAlreadyLoaded - dbTotal;
    const apiResult = await getRecipeByName(name);
    addMeals(apiResult);
    const slice = apiResult.slice(apiOffset, apiOffset + 10);
    return { meals: getMealsPreview(slice), hasMore: slice.length >= 10 };
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