import { useEffect, useState} from "react"
import { getARecipe } from "../../services/recipeService"
import { useParams, useNavigate} from "react-router-dom"


function ViewRecipe({user,setUser}){

let [recipe,setRecipe] = useState({})

const params = useParams()
const navigate = useNavigate()

function goBack(){
    navigate(-1)//-1 to go back to previous page
}  

useEffect(()=>{
    callGetARecipe()
},[])

async function callGetARecipe(){
    const data = await getARecipe(params.rid)
    setRecipe(data)
}

    return(
         <div className="details">
            <div className="recipeDetails"><img  src={recipe.imagepath} /></div>
            <div className="recipeDetails"><h3 className="mealnamevideo">{recipe.recipeName}</h3></div>
            <div className="recipeDetails"><a className="mealnamevideo"href={recipe.videopath}>Watch Recipe Here</a></div>
            <p className="instructions"><strong>Ingredients : </strong>{recipe.ingredients} <br/>
                <strong>Measures    : </strong>{recipe.measures}</p>
            
            {/* {recipe.ingredients?.map((list,index)=>
           
           <p>{index+1}.  {recipe.ingredients[index+1]} : {recipe.measures[index+1]}</p>
       
            )}  */}
                {/* {recipe.ingredients.map((item,index)=>
                <li>
                    {recipe.ingredients[index+1]!==''?<>{index}.  {ingredients[index]} : {measures[index]}</>: ''}
                </li>
                )} */}
          
            <p className="instructions"><strong>Instructions : <br /><br /></strong>{recipe.instructions}</p>
            <br/><br/>
            <div className="recipeDetails back"><button onClick={goBack}>Back</button></div>
        
        </div>
    )
}


export default ViewRecipe