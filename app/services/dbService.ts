import {openDatabaseSync }from 'expo-sqlite';
import { mealItem } from '../Constants/types';

const db = openDatabaseSync('pandm3.db');

export function setupDB(){
    db.execSync(`CREATE TABLE IF NOT EXISTS meals (
        idMeal INTEGER NOT NULL,
        Meal TEXT NOT NULL,
        Category TEXT NOT NULL,
        Area TEXT NOT NULL,
        Instructions TEXT NOT NULL,
        MealThumb TEXT DEFAULT NULL,
        Tags TEXT DEFAULT NULL,
        Youtube TEXT DEFAULT NULL,
        Ingredients TEXT NOT NULL,
        Measures TEXT NOT NULL
        )`);
}

export function addMeals(meals: mealItem[]){
    for (let i = 0; i < meals.length; i++) {
        addMeal(meals[i]);
    }
}

export function addMeal(meal: mealItem){
    db.runSync(`
        INSERT OR IGNORE INTO meals (idMeal, Meal, Category, Area, Instructions, MealThumb, Tags, Youtube, Ingredients, Measures) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            meal.idMeal, 
            meal.Meal, 
            meal.Category, 
            meal.Area, 
            meal.Instructions, 
            meal.MealThumb, 
            meal.Tags, 
            meal.Youtube, 
            meal.Ingredients, 
            meal.Measures
        ]
    );
}

export function getMealById(id: number): mealItem | null {
    const meal = db.getFirstSync<mealItem>(`
        SELECT * FROM meals
        WHERE idMeal = ?`, [id]);
    
    if (meal) {
        return {
            ...meal,
            Ingredients: meal.Ingredients,
            Measures: meal.Measures
        };
    }
    return null;
}


export function getMealsByName(name: string): mealItem[]{
    const meals = db.getAllSync<mealItem>(`
        SELECT * FROM meals
        WHERE meals.Meal LIKE ?`, [`%${name}%`]);

    return meals.map(meal => ({
        ...meal,
        Ingredients: meal.Ingredients,
        Measures: meal.Measures
    }));
}

export function getMealsByCategory(category: string): mealItem[] {
    const meals = db.getAllSync<mealItem>(`
        SELECT * FROM meals
        WHERE meals.Category = ?`, [category]);

    return meals.map(meal => ({
        ...meal,
        Ingredients: meal.Ingredients,
        Measures: meal.Measures
    }));
}

export function getMealsByArea(area: string): mealItem[] {
    const meals = db.getAllSync<mealItem>(`
        SELECT * FROM meals
        WHERE Area = ?`, [area]);

        return meals.map(meal => ({
        ...meal,
        Ingredients: meal.Ingredients,
        Measures: meal.Measures
    }));
}

export function getEveryMeals(): mealItem[]{
    const meals = db.getAllSync<mealItem>(`SELECT * FROM meals`);

        return meals.map(meal => ({
        ...meal,
        Ingredients: meal.Ingredients,
        Measures: meal.Measures
    }));

}