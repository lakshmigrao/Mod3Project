import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getARecipe,updateARecipe } from '../../services/recipeService'

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
        let newrecipe = {
            recipeId: '',
            // userId: '',
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
                recipeId: recipeIdRef,
                // userId: user.id,
                recipeName: nameRef,
                ingredients: ingRef,
                measures: mesRef,
                instructions: insRef,
                imagepath: imgRef,
                videopath: vidRef
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
              alert(`${newrecipe.recipeName} is added to My Recipes.`)
        
           
        }
    
        return ( 
            <div>
                <h1>New Recipe </h1>
                <div className='buttons details' style={{ flexDirection: 'column' }}>
                    <form onSubmit={handleSubmit}>
    
                        <img style={{width:"300px",height:"300px"}} src={recipe.imagepath} alt="" />
                        <br />
                        <label htmlFor="rname">Recipe Name :</label><br />
                        <textarea ref={nameRef} id="rname" defaultValue={recipe.recipeName} /><br /><br />
                
                        <label htmlFor="ing">Ingredients :</label><br />
                        <textarea ref={ingRef} id="ing" cols="60" rows="3" defaultValue={recipe.ingredients} /><br /><br />

                        <label htmlFor="ing">Measures :</label><br />
                        <textarea ref={mesRef} id="ing" cols="60" rows="3" defaultValue={recipe.measures} /><br /><br />
                        
                        <label htmlFor="ins">Instructions :</label><br />
                        <textarea ref={insRef} id="ins" cols="60" rows="8" defaultValue={recipe.instructions} /><br /><br />
    
                        <button style={{marginLeft:"150px"}}>Save</button>
                        <Link to={`/myrecipes`}>
                            <button style={{marginLeft:"100px"}}>Back</button>
                        </Link>
                    </form>
                    
                    
                </div>
            </div>
        );

}
export default NewRecipe