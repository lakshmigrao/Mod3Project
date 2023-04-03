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
            <div className="recipeDetails"><img src={recipe.imagepath} /></div>
            <div className="recipeDetails"><h3>{recipe.recipeName}</h3></div>
            <div className="recipeDetails"><a className=" video"href={recipe.videopath}><i class="fa-brands fa-youtube"></i></a></div>
            <div className="ingredients"><strong>Ingredients   </strong>-----<strong>Measures    </strong>
            <br />
            {recipe?.ingredients?.map((item,index )=>
            <p>{index+1}. {recipe.ingredients[index]}-----{recipe.measures[index]}</p>
            )}
            </div>
            {/* {recipe.ingredients?.map((list,index)=>
           
           <p>{index+1}.  {recipe.ingredients[index+1]} : {recipe.measures[index+1]}</p>
       
            )}  */}
                {/* {recipe.ingredients.map((item,index)=>
                <li>
                    {recipe.ingredients[index+1]!==''?<>{index}.  {ingredients[index]} : {measures[index]}</>: ''}
                </li>
                )} */}
          
            <p className="instructions"><strong>Instructions : <br /><br /></strong>{recipe.instructions}</p>
            <br/>
            <Link to={`/myrecipes/edit/${recipe._id}`}>
                 <button style={{marginLeft:"375px"}}>Edit</button>
            </Link>
            <button  style={{marginLeft:"100px"}}onClick={goBack}>Back</button>
        
        </div>
    )
}


export default ViewRecipe