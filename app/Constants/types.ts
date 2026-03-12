export interface mealItem {
            idMeal: string,
            Meal: string,
            MealAlternate: string,
            Category: string,
            Area: string,
            Instructions: string,
            MealThumb: string,
            Tags: string,
            Youtube: string,
            Ingredient1: string,
            Ingredient2: string,
            Ingredient3: string,
            Ingredient4: string,
            Ingredient5: string,
            Ingredient6: string,
            Ingredient7: string,
            Ingredient8: string,
            Ingredient9: string,
            Ingredient10: string,
            Ingredient11: string,
            Ingredient12: string,
            Ingredient13: string,
            Ingredient14: string,
            Ingredient15: string,
            Ingredient16: string,
            Ingredient17: string,
            Ingredient18: string,
            Ingredient19: string,
            Ingredient20: string,
            Measure1: string,
            Measure2: string,
            Measure3: string,
            Measure4: string,
            Measure5: string,
            Measure6: string,
            Measure7: string,
            Measure8: string,
            Measure9: string,
            Measure10: string,
            Measure11: string,
            Measure12: string,
            Measure13: string,
            Measure14: string,
            Measure15: string,
            Measure16: string,
            Measure17: string,
            Measure18: string,
            Measure19: string,
            Measure20: string,
            Source: string,
            ImageSource: string,
            CreativeCommonsConfirmed: string,
            dateModified: string
}

export interface mealItemRetyped {
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

export function retypeMeal(meal: mealItem): mealItemRetyped {
    const ingredients: string[] = []
    const measures: string[] = []

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`Ingredient${i}` as keyof mealItem] as string
        const measure = meal[`Measure${i}` as keyof mealItem] as string

        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(ingredient)
            measures.push(measure)
        }
    }

    return {
        idMeal: Number(meal.idMeal),
        Meal: meal.Meal,
        Category: meal.Category,
        Area: meal.Area,
        Instructions: meal.Instructions,
        MealThumb: meal.MealThumb,
        Tags: meal.Tags,
        Youtube: meal.Youtube,
        Ingredients: ingredients,
        Measures: measures
    }
}