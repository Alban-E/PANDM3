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

export function addMeal(meal: mealItem){
    let strIngredients: string = '';
    for (let i = 0; i < meal.Ingredients.length; i++){
        strIngredients += meal.Ingredients[i];
    }
    
    let strMeasures: string = '';
    for (let i = 0; i < meal.Measures.length; i++){
        strMeasures += meal.Measures[i];
    }

    db.runSync(`
        INSERT INTO meals (idMeal, Meal, Category, Area, Instructions, MealThumb, Tags, Youtube, Ingredients, Measures) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [meal.idMeal, meal.Meal, meal.Category, meal.Area, meal.Instructions, meal.MealThumb, meal.Tags, meal.Youtube, strIngredients, strMeasures]
    );
}

// export function getMealByName(name: string): mealItem[]{
//     const meals = db.getAllSync<mealItem>(`
//         SELECT * FROM meals
//         WHERE meals.Meal LIKE ?`, [`%${name}%`]);

//     return meals;
// }