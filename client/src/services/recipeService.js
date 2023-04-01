import { customAxios, customAxiosWithAuth } from "./api";

export async function addRecipeToFav(recipe) {

    const axios = customAxiosWithAuth()
    try {
        const response = await axios.post('/', recipe)
        return response.data
    } catch (err) {
        console.log(err.message)
    }
}
export async function removeRecipeFromUserFav(recipeId) {

    const axios = customAxiosWithAuth()
    try {
        await axios.delete(`/myrecipes/${recipeId}`)
    } catch (err) {
        console.log(err.message)
    }
}

export async function getRecipesFromUser() {

    const axios = customAxiosWithAuth()
    try {
        const response = await axios.get(`/myrecipes`)
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err.message)
    }
}
export async function getARecipe(recipeId) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.get(`/myrecipes/${recipeId}`)
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err.message)
    }
}

export async function updateARecipe(recipeId,recipe) {
    const axios = customAxiosWithAuth()
    try {
        await axios.put(`/myrecipes/edit/${recipeId}`,recipe)
    } catch (err) {
        console.log(err.message)
    }
}


export async function removeRecipeFromUserFavUsingId(recipeIdMeal) {

    const axios = customAxiosWithAuth()
    try {
        await axios.delete(`/${recipeIdMeal}`)
    } catch (err) {
        console.log(err.message)
    }
}