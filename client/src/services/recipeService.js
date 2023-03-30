import { customAxios,customAxiosWithAuth } from "./api";

export async function addRecipeToFav(recipe){

    const axios = customAxiosWithAuth()
    try{
        const response = await axios.post('/',recipe)
        return response.data
    }catch(err){
        console.log(err.message)
    }
}

export async function getRecipesForUser(name){

    const axios = customAxiosWithAuth()
    try{
        const response = await axios.get(`/myrecipes/${name}`)
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err.message)
    }
    
}