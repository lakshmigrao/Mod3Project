import { useEffect, useState} from "react"
import { getARecipe } from "../../services/recipeService"
import { useParams, useNavigate} from "react-router-dom"
import { Link } from "react-router-dom"


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
            <abbr className="delete" title="Go Back">
                    <i onClick={goBack} style={{fontSize:"40px", cursor:"pointer"}} class="fa-solid fa-circle-arrow-left" alt="Go Back"></i>
            </abbr> 
            <div className="recipeDetails"><img style={{border: "3px solid black", boxShadow:" 12px 12px 2px 2px black"}}src={recipe.imagepath} /></div>
            <br />
            <div className="recipeDetails"><h3>{recipe.recipeName}</h3></div>
            <div className="recipeDetails"><a className=" video"href={recipe.videopath}><i class="fa-brands fa-youtube"></i></a></div>
            {recipe.ingredients?.[0]?
                <div className="ingredients"><strong>Ingredients   </strong> : <strong>Measures    </strong> 
                 <br />
                {recipe?.ingredients?.map((item,index )=>
                    <p>{index+1}. {recipe.ingredients[index]} : {recipe.measures[index]}</p>
                )}
                </div>
            : ''}
          
            {recipe.instructions?<p className="instructions"><strong>Instructions : <br /></strong>{recipe.instructions}</p>:''}
            <br/>
            <Link to={`/myrecipes/edit/${recipe._id}`}>
                 <button style={{marginLeft:"375px"}}>Edit <i style={{fontSize:"25px"}}class="fa-solid fa-pen-to-square"></i></button>
            </Link>
            <button  style={{marginLeft:"100px"}}onClick={goBack}><i class="fa-solid fa-circle-arrow-left" alt="Go Back"></i>Back</button>
        
        </div>
    )
}


export default ViewRecipe