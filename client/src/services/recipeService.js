import { customAxios,customAxiosWithAuth } from "./api";

export async function addRecipeToFav(recipe){

    const axios = customAxiosWithAuth()
    try{
        const response = await axios.post('/',{recipe})
        return response.data
    }catch(err){
        console.log(err.message)
    }
}