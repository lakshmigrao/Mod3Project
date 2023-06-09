
import { customAxios, customAxiosWithAuth } from "./api"

export async function userLogin(user){
    const axios = customAxios()
    try{
        const response = await axios.post('/auth/login',user)
        return response.data.token
    }catch(err){

        console.log(err)
        alert(err.response?.data?.error)
    }
}

export async function userRegister(user){
    const axios = customAxios()
    console.log(user)
    try{
        const response = await axios.post('/auth/register',user)
        return response.data.token
    }catch(err){
        console.log(err)
        alert(err.response?.data?.error)
    }
}

export async function userInfo(){
    const axios = customAxiosWithAuth()
    try{
        const response = await axios.get('/users')
        return response.data
    }catch(err){
        localStorage.removeItem("token")
    }
}

export async function updateUserInfo(user){
    const axios = customAxiosWithAuth()
    try{
        await axios.put(`/users/profile/edit`,user)
    }catch(err){
        localStorage.removeItem("token")
    }

}

export async function deleteUser(){
    const axios = customAxiosWithAuth()
    try{
        await axios.delete(`/users/profile`)
    }catch(err){
        localStorage.removeItem("token")
    }

}