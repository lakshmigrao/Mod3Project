import SearchForm from "./SearchForm"
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { addRecipeToFav } from "../../services/recipeService";
import { removeRecipeFromUserFavUsingId } from "../../services/recipeService";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart  } from '@fortawesome/free-solid-svg-icons'
// import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RecipeDisplay({ recipes, myRecipes,setMyRecipes, user, setUser }) {

    let navigate = useNavigate()   

    let favoriteArray = []
   
    useEffect(()=>{
      if(user){
        populateFavoriteArray()
      }
      console.log(user)
    },[favoriteArray])

    async function populateFavoriteArray(){

      if(JSON.parse(localStorage.getItem(user.username))){
          favoriteArray=localStorage.getItem(user.username)
          console.log(favoriteArray)
      }else{
        user.favoriterecipes?.map((item,index)=>{
          favoriteArray?.push(item.recipeId)
        })
        localStorage.setItem(user.username,JSON.stringify(favoriteArray))
      }
    }

    async function addToMyRecipes(item) {
      let ingredients = []
      let measures = []
      for (let i = 0; i < 20; i++) {
        if (item[`strIngredient${i + 1}`] == '') {
          break
        }
        ingredients[i] = item[`strIngredient${i + 1}`]
        measures[i] = item[`strMeasure${i + 1}`]
      }
      let newrecipe = {
        recipeId: item.idMeal,
        userId: user.id ? user.id : user._id,
        recipeName: item.strMeal,
        ingredients: ingredients,
        measures: measures,
        instructions: item.strInstructions,
        imagepath: item.strMealThumb,
        videopath: item.strYoutube
      } 

      if(JSON.parse(localStorage.getItem(user.username))){
        favoriteArray=JSON.parse(localStorage.getItem(user.username))
        favoriteArray.push(newrecipe.recipeId)
        localStorage.setItem(user.username,JSON.stringify(favoriteArray))
      }else{
        favoriteArray.push(newrecipe.recipeId)
      }
    
      let updatedUser = { ...user }
      updatedUser.favoriterecipes.push(newrecipe)
      setUser(updatedUser)
      await addRecipeToFav(newrecipe)
      navigate('/')
      toast(`${newrecipe.recipeName} is added to My Recipes.`)
    }
 
  async function handleDelete(recipe) {
   
    await removeRecipeFromUserFavUsingId(recipe.idMeal)
    let updatedUser = {...user}
    updatedUser.favoriterecipes= updatedUser.favoriterecipes.filter(c => c._id !== recipe._id)
    setUser(updatedUser)
    
    favoriteArray=JSON.parse(localStorage.getItem(user.username))
    let index = favoriteArray.indexOf(recipe.recipeId)
    favoriteArray.splice(index,1)
    localStorage.setItem(user.username,JSON.stringify(favoriteArray))
    toast(`${recipe.strMeal} is removed from My Recipes.`)
  }
  if (recipes.meals) {
   
    if(user && user.favoriterecipes){
        favoriteArray = JSON.parse(localStorage.getItem(user.username))
    }
    let userExists=false;
    if (user?.id || user?._id){
       userExists = true
    }
    return (
      recipes.meals.map((item, index) =>
        <div key={index} className="recipeCard card">
          {/* <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
          /> */}
          {userExists ?

            (favoriteArray?.indexOf(item.idMeal) > -1) ?
              <i onClick={() => { handleDelete(item) }} style={{ marginLeft:"240px"}} className="fa-solid fa-heart"></i>
            :
              <i onClick={() => { addToMyRecipes(item) }} style={{ marginLeft:"240px"}} className="fa-regular fa-heart"></i>
          
          :''}
       
          <Link to={`/recipes/${item.idMeal}`}>  <h4>{item.strMeal}</h4>
            <img src={item.strMealThumb} alt="" />
          </Link>
        </div>
      )
    )
  }
}

export default RecipeDisplay;
