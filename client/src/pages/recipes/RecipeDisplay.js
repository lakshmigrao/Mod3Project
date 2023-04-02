import SearchForm from "./SearchForm"
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { addRecipeToFav } from "../../services/recipeService";
import { removeRecipeFromUserFavUsingId } from "../../services/recipeService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart  } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";


function RecipeDisplay({ recipes, myRecipes,setMyRecipes, user, setUser }) {

    let navigate = useNavigate()   

    let favoriteArray = []
   
    useEffect(()=>{
      if(user){
        populateFavoriteArray()
      }
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
        userId: user.id,
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
      alert("Recipe is added to your list")
  }
 
  async function handleDelete(recipe) {
   
    await removeRecipeFromUserFavUsingId(recipe.idMeal)
    let updatedUser = {...user}
    updatedUser.favoriterecipes= updatedUser.favoriterecipes.filter(c => c._id !== recipe._id)
   //console.log(updatedUser.favoriterecipes)
    setUser(updatedUser)

    favoriteArray=JSON.parse(localStorage.getItem(user.username))
    let index = favoriteArray.indexOf(recipe.recipeId)
    favoriteArray.splice(index,1)
    console.log(favoriteArray+"after deletion")
    localStorage.setItem(user.username,JSON.stringify(favoriteArray))
    alert("Recipe is removed from your list")
   //navigate(`/myrecipes/${name}`)
}
  if (recipes.meals) {
   
    if(user && user.favoriterecipes){
      favoriteArray = JSON.parse(localStorage.getItem(user.username))
    }

    return (

      recipes.meals.map((item, index) =>
        <div key={index} className="recipeCard card">
          {user?.id? 
          (favoriteArray?.indexOf(item.idMeal) > -1) ?

            <i onClick={() => { handleDelete(item) }} style={{ color: "red" }} className="fa-solid fa-heart"></i>
          :
          <>
            <i onClick={() => { addToMyRecipes(item) }} className="fa-regular fa-heart"></i>
            {/* <button onClick={() => { addToMyRecipes(item) }}>Add to My Recipes</button>  */}
          </>
            :''}
       
  {/* //         (myRecipes.map((eachmyrecipe)=>{
  //           <>
  //             if (eachmyrecipe === item.idMeal){
  //               <i style={{ color: "red" }} className="fa-solid fa-heart"></i>
  //             }else{
  //               <i className="fa-regular fa-heart"></i>
  //             }
  //           </>
  // })) */}
        
        {/* //   (favoriteArray.includes(item.idMeal)) ? 
        //   <FontAwesomeIcon icon={faHeart} />
        //   :
        //   //<FontAwesomeIcon icon="fa-regular fa-heart" />
 
        //   <FontAwesomeIcon icon="fa-solid fa-heart" />
        
        //  :''}  */}
          <Link to={`/recipes/${item.idMeal}`}>  <h2>{item.strMeal}</h2>
              {/* {item.idMeal} */}
            <img src={item.strMealThumb} alt="" /></Link>


          {/* <h2>{item.recipe.label}</h2>
        <img src={item.recipe.image} alt="" /> */}

        </div>)
    )
}
}

export default RecipeDisplay;
