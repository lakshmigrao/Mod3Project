import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function RecipeDetails({myRecipes,setMyRecipes,user}){

    let { idMeal } = useParams()
    console.log("Useparams ", idMeal )
    let navigate = useNavigate()
    
    let [recipeDetails, setRecipeDetails] = useState()
    
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    let ingredients = []
    let measures = []
    const getRecipeDetails = async() => { //async function getCoin() {}, function hoisting
        try{
            const response = await fetch(url)
            const data = await response.json()
            setRecipeDetails(data)
            console.log(data)
        }catch(error){
            console.error(error)
        }
       
        
    }
    useEffect(() => {
        getRecipeDetails()
    }, [])
    

    function goBack(){
        navigate(-1)//-1 to go back to previous page
    }
    const loaded = () => {
        // let item;
        //let index;
        // if(recipeDetails.meals){
        //     console.log("recipeDetails.meals")
        //     console.log(recipeDetails.meals)
        //     console.log(idMeal)
            
            // for(let i=0;i<recipeDetails.items.length;i++){            
            //     if(recipeDetails.items[i].volumeInfo.title
            //         && recipeDetails.items[i].volumeInfo.industryIdentifiers){                               
            //     if(isbn===recipeDetails.items[i].volumeInfo.industryIdentifiers[0].identifier.replace(/[?:,.`~<>@#$%^&*/]/g, '')//encodeURIComponent(recipeDetails.items[i].volumeInfo.industryIdentifiers[0].identifier)//
            //     || title===recipeDetails.items[i].volumeInfo.title.replace(/[?:,.`~<>@#$%^&*/]/g, '')//encodeURIComponent(recipeDetails.items[i].volumeInfo.title)//
            //     ){
            //         index=i;
            //         break;
            //     }}

            // }
        //     //item = recipeDetails.items.filter(recipe =>id === recipe.id)
        //     item=recipeDetails.items[index]
        //     console.log("item")
        // console.log(item)
        for(let i=1;i<20;i++){
            ingredients[i]=recipeDetails.meals[0][`strIngredient${i}`]
            measures[i]=recipeDetails.meals[0][`strMeasure${i}`]
        }
        console.log(ingredients)
     
        return (
            <div className="details">
                <abbr className="delete" title="Go Back">
                    <i onClick={goBack} style={{fontSize:"40px", cursor:"pointer"}} class="fa-solid fa-circle-arrow-left" alt="Go Back"></i>
                </abbr> 
                <div className="recipeDetails"><h1 className="mealnamevideo">{recipeDetails.meals[0].strMeal}</h1></div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div>
                        <ul className="ingredients"><strong>Ingredients : <br/><br/></strong>
                            
                            {ingredients.map((item,index)=>
                            <li key={index}>
                                {ingredients[index]!==''?<>{index}.  {ingredients[index]} : {measures[index]}</>: ''}
                            </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <div className="recipeDetails"><img  src={recipeDetails.meals[0].strMealThumb} /></div>
                        <br />
                        <div className="recipeDetails"><abbr title="Click to watch the video"><a className="mealnamevideo video"href={recipeDetails.meals[0].strYoutube}><i class="fa-brands fa-youtube"></i></a></abbr></div>
                    </div>
                </div>
                <p className="instructions"><strong>Instructions : <br /><br /></strong>{recipeDetails.meals[0].strInstructions}</p>
                <br/><br/>
            </div>)
      {/*       )}else{
            return(<>
                <h1>The recipe details not found in database.</h1>
                <button onClick={goBack}>Back</button>
            </>)
        }
        }else{
            return(<>
                <h1>The recipe details not found in database.</h1>
                <button onClick={goBack}>Back</button>
            </>) 
        } */}
        
    }
        

    const loading = () => {
        return(
            <h1>recipe Details Page Loading...</h1>
        )
    }
   
    return recipeDetails ? loaded() : loading()
//return
}

export default RecipeDetails
