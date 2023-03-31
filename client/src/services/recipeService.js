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
export async function removeRecipeFromUserFav(recipeId, name) {

    const axios = customAxiosWithAuth()
    try {
        await axios.delete(`/myrecipes/${name}/${recipeId}`)
        return response.data
    } catch (err) {
        console.log(err.message)
    }
}

export async function getRecipesFromUser(name) {

    const axios = customAxiosWithAuth()
    try {
        const response = await axios.get(`/myrecipes/${name}`)
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err.message)
    }
}
export async function getARecipe(name,recipeId) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.get(`/myrecipes/${name}/edit/${recipeId}`)
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err.message)
    }
}

export async function updateARecipe(name,recipeId,recipe) {
    const axios = customAxiosWithAuth()
    try {
        await axios.put(`/myrecipes/${name}/edit/${recipeId}`,recipe)
    } catch (err) {
        console.log(err.message)
    }
}