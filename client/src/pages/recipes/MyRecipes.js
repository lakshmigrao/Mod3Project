import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getRecipesForUser } from "../../services/recipeService"

function MyRecipes({myRecipes,setMyRecipes,user,setUser}){
    let navigate = useNavigate()
    let {name} = useParams()
    console.log(name)
    useEffect(()=>{
        loadData()
    },[])
    async function loadData(){
        const data = await getRecipesForUser(name)
       // if(!data) navigate('/')
        setUser(data)
        console.log(user)
    }
    if(user.favoriterecipes.length){
    return(
        <div className="App">
       { user.favoriterecipes.map((item,index) =>
        <div key={index} className="recipeCard card">
           <h2>{item.recipeName}</h2> 
           <h3>{item.recipeId}</h3> 
            <img src={item.imagepath} alt="" />
            <a href={item.videopath}>Watch the video here</a>
            <p>{item.instructions}</p>
       
        {/* <h2>{item.recipe.label}</h2>
        <img src={item.recipe.image} alt="" /> */}

    </div>)}</div>
    )}else{
        return(
        <div>
            <h1>No Recipes in Favorites List</h1>
        </div>)
    }
}

export default MyRecipes