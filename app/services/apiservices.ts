import { axiosInstance } from "./axios";

// Base home page use this api request : www.themealdb.com/api/json/v1/1/filter.php?a=French 

export function getRecipeByName(name: string){
    return axiosInstance.get("/search.php", {
        params: {
            s: name,
        }
    })
}

export function getRecipeByArea(area: string = "French"){
    return axiosInstance.get('/filter.php', {
        params: {
            a: area
        }
    });
}

export function getRecipeByCategory(category : string) {
    return axiosInstance.get('filter.php', {
        params:{
            c: category || null,
        }
    });
}

export function getFilters(area: boolean = false, category: boolean = false){
    const defaultParam = "list";
    if (area) {
        return axiosInstance.get('/list.php', {
            params:{
                a: defaultParam,
            }
        });
    }
    else if (category) {
        return axiosInstance.get('/list.php', {
            params:{
                c: defaultParam,
            }
        });
    }
}

export function getMealDetails(id: number){
    return axiosInstance.get("/lookup.php",{
    params:{
        i: String(id)
    }
    })
}