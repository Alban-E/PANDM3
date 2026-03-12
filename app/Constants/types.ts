export interface sourceMealItem {
            idMeal: string,
            strMeal: string,
            strMealAlternate: string,
            strCategory: string,
            strArea: string,
            strInstructions: string,
            strMealThumb: string,
            strTags: string,
            strYoutube: string,
            strIngredient1: string,
            strIngredient2: string,
            strIngredient3: string,
            strIngredient4: string,
            strIngredient5: string,
            strIngredient6: string,
            strIngredient7: string,
            strIngredient8: string,
            strIngredient9: string,
            strIngredient10: string,
            strIngredient11: string,
            strIngredient12: string,
            strIngredient13: string,
            strIngredient14: string,
            strIngredient15: string,
            strIngredient16: string,
            strIngredient17: string,
            strIngredient18: string,
            strIngredient19: string,
            strIngredient20: string,
            strMeasure1: string,
            strMeasure2: string,
            strMeasure3: string,
            strMeasure4: string,
            strMeasure5: string,
            strMeasure6: string,
            strMeasure7: string,
            strMeasure8: string,
            strMeasure9: string,
            strMeasure10: string,
            strMeasure11: string,
            strMeasure12: string,
            strMeasure13: string,
            strMeasure14: string,
            strMeasure15: string,
            strMeasure16: string,
            strMeasure17: string,
            strMeasure18: string,
            strMeasure19: string,
            strMeasure20: string,
            strSource: string,
            strImageSource: string,
            strCreativeCommonsConfirmed: string,
            dateModified: string
}

export interface mealItem {
            idMeal: number,
            Meal: string,
            Category: string,
            Area: string,
            Instructions: string,
            MealThumb: string,
            Tags: string,
            Youtube: string,
            Ingredients: string[],
            Measures: string[],
}

export function retypeMeal(meals: sourceMealItem[]): mealItem[] {
    let results: mealItem[] = [];
    for(let i = 0; i < meals.length; i++){
        const ingredients: string[] = []
        const measures: string[] = []

        for (let j = 1; j <= 20; j++) {
            const ingredient = meals[i][`strIngredient${j}` as keyof sourceMealItem] as string
            const measure = meals[i][`strMeasure${j}` as keyof sourceMealItem] as string

            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(ingredient)
                measures.push(measure)
            }
        }

        results.push({
            idMeal: Number(meals[i].idMeal),
            Meal: meals[i].strMeal,
            Category: meals[i].strCategory,
            Area: meals[i].strArea,
            Instructions: meals[i].strInstructions,
            MealThumb: meals[i].strMealThumb,
            Tags: meals[i].strTags,
            Youtube: meals[i].strYoutube,
            Ingredients: ingredients,
            Measures: measures
        })
    }

    return results;
}

export interface mealPreview {
  idMeal: string;
  Meal: string;
  MealThumb: string;
}

export function getMealsPreview(meals: sourceMealItem[]) :mealPreview[]{
    let resuts: mealPreview[] = [];

    for (let i = 0 ; i < meals.length; i++) {
        resuts.push({
            idMeal: meals[i].idMeal,
            Meal: meals[i].strMeal,
            MealThumb: meals[i].strMealThumb,
        })
    }

    return resuts;
}