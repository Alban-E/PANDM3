import axios from 'axios'

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

export const axiosInstance = axios.create({
    baseURL : API_URL,
    params:{}
})

axiosInstance.interceptors.request.use((config) =>{
    console.log('Requête envoyée: ', config);
    return config;
});

axiosInstance.interceptors.response.use((response) =>{
    return response
    }, (error) => {
        console.error('Une erreur est survenue: ', error);
        return Promise.reject(error);
    }
);