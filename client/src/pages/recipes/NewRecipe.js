import React from 'react';

import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { createNewRecipeInFav } from '../../services/recipeService'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NewRecipe({user,setUser}){
    let favoriteArray = []
        const [recipe,setRecipe] = useState({})
        const navigate = useNavigate()
        const params = useParams()
    
        const nameRef = useRef()
        const recipeIdRef = useRef()
        const insRef = useRef()
        const ingRef = useRef()
        const mesRef = useRef()
        const imgRef = useRef()
        const vidRef = useRef()
    
        useEffect(()=>{
            if(user){
            populateFavoriteArray()
          }
        },[favoriteArray])

        async function populateFavoriteArray(){
         if(JSON.parse(localStorage.getItem(user.username)) ){
                favoriteArray=localStorage.getItem(user.username)
                console.log(favoriteArray)
            }else{
              user.favoriterecipes?.map((item,index)=>{
                favoriteArray?.push(item.recipeId)
              })
              localStorage.setItem(user.username,JSON.stringify(favoriteArray))
            }
          
          
          }
        let newrecipe = {
            recipeId: '',
            userId: '',
            recipeName: '',
            ingredients: '',
            measures: '',
            instructions: '',
            imagepath: '',
            videopath: ''
          } 
        // async function addToMyRecipes(item) {
        //     // let ingredients = []
        //     // let measures = []
        //     // for (let i = 0; i < 20; i++) {
        //     //   if (item[`strIngredient${i + 1}`] == '') {
        //     //     break
        //     //   }
        //     //   ingredients[i] = item[`strIngredient${i + 1}`]
        //     //   measures[i] = item[`strMeasure${i + 1}`]
        //     // }
        //     let newrecipe = {
        //       recipeId: item.idMeal,
        //       userId: user.id,
        //       recipeName: item.strMeal,
        //       ingredients: ingredients,
        //       measures: measures,
        //       instructions: item.strInstructions,
        //       imagepath: item.strMealThumb,
        //       videopath: item.strYoutube
        //     } 
      
        //     if(JSON.parse(localStorage.getItem(user.username))){
        //       favoriteArray=JSON.parse(localStorage.getItem(user.username))
        //       favoriteArray.push(newrecipe.recipeId)
        //       localStorage.setItem(user.username,JSON.stringify(favoriteArray))
        //     }else{
        //       favoriteArray.push(newrecipe.recipeId)
        //     }
          
        //     let updatedUser = { ...user }
        //     updatedUser.favoriterecipes.push(newrecipe)
        //     setUser(updatedUser)
        //     await addRecipeToFav(newrecipe)
        //     navigate('/')
        //     alert(`${newrecipe.recipeName} is added to My Recipes.`)
        // }
        async function handleSubmit(e) {
            e.preventDefault()
    
            let newrecipe = {
                recipeId: recipeIdRef.current.value,
                userId: user._id,
                recipeName: nameRef.current.value,
                ingredients: ingRef.current.value,
                measures: mesRef.current.value,
                instructions: insRef.current.value,
                imagepath: imgRef.current.value,
                videopath: vidRef.current.value
              } 
              console.log(newrecipe)
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
              await createNewRecipeInFav(newrecipe)
              navigate('/myrecipes')
              alert(`${newrecipe.recipeName} is added to My Recipes.`)
        
           
        }

        function goBack(){
          navigate(-1)
        }
    
        return ( 
            <div>
                <div className='buttons details' style={{ flexDirection: 'column' }}>
                <h1 style={{display:"flex", justifyContent:"center"}}>New Recipe </h1>
                <abbr className="delete" title="Go Back">
                    <i onClick={goBack} style={{fontSize:"40px", cursor:"pointer"}} class="fa-solid fa-circle-arrow-left" alt="Go Back"></i>
                </abbr>
                    <form onSubmit={handleSubmit}>    
                    <ToastContainer
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
                    />    
                        {/* <img style={{width:"300px",height:"300px"}} src={recipe.imagepath} alt="" /> */}
                        <label htmlFor="imagePath">Image Path :</label><br />
                        <textarea ref={imgRef} id="imagePath" /><br /><br />
                        <br />

                        <label htmlFor="videoPath">Video Path :</label><br />
                        <textarea ref={vidRef} id="videoPath" /><br /><br />
                        <br />

                        <label htmlFor="rname">Recipe Name :</label><br />
                        <textarea ref={nameRef} id="rname"  /><br /><br />

                        <label htmlFor="rid">Recipe Id : (A number between 1 and 1000)</label><br />
                        <textarea ref={recipeIdRef} id="rid"  /><br /><br />
                
                        <label htmlFor="ing">Ingredients :</label><br />
                        <textarea ref={ingRef} id="ing" cols="60" rows="3"  /><br /><br />

                        <label htmlFor="ing">Measures :</label><br />
                        <textarea ref={mesRef} id="ing" cols="60" rows="3"  /><br /><br />
                        
                        <label htmlFor="ins">Instructions :</label><br />
                        <textarea ref={insRef} id="ins" cols="60" rows="8"  /><br /><br />
    
                        <button style={{marginLeft:"150px"}}>Save <i style={{fontSize:"20px"}} class="fa-regular fa-floppy-disk"></i></button>
                        <Link to={`/myrecipes`}>
                            <button style={{marginLeft:"100px"}}><i class="fa-solid fa-circle-arrow-left" alt="Go Back"></i>Back</button>
                        </Link>
                    </form>
                    
                    
                </div>
            </div>
        );

}
export default NewRecipe