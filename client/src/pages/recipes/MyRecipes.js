import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getARecipe, getRecipesFromUser, removeRecipeFromUserFav } from "../../services/recipeService"
import { Link } from "react-router-dom"
import ViewRecipe from "./ViewRecipe"

function MyRecipes({ myRecipes, setMyRecipes, user, setUser }) {//
    let updatedUser = {}

    let navigate = useNavigate()
    let { name } = useParams()
    console.log(name)
    useEffect(() => {
        async function loadData() {
            const data = await getRecipesFromUser(name)
             if(!data) navigate('/')
            setUser(data)
            console.log(user)
        }
     loadData()
    }, [updatedUser])
   
    async function handleDelete(recipe) {
        //console.log(recipe._id)
        await removeRecipeFromUserFav(recipe._id,name)
        let updatedUser = {...user}
        updatedUser.favoriterecipes= updatedUser.favoriterecipes.filter(c => c._id !== recipe._id)
       console.log(updatedUser.favoriterecipes)
        setUser(updatedUser)
       //navigate(`/myrecipes/${name}`)
    }

    async function handleView(recipe){

        await getARecipe(name,recipe._id)
        
    }


    if (user.favoriterecipes?.length) {
        return (
            <div className="App">
                {user.favoriterecipes.map((item, index) =>
                    <div key={index} className="favorite recipeCard">
                         
                        <Link to={`/myrecipes/${name}/edit/${item._id}`}>
                                    <button>Edit</button>
                        </Link>
                        <button onClick={() => { handleView(item) }}> View </button>
                        <button onClick={() => { handleDelete(item) }}> Remove </button>
                        
                        <h2>{item.recipeName}</h2>
                        {/* <h3>{item.recipeId}</h3> */}
                        <a href={item.videopath}>Link to Video</a>
                        <img src={item.imagepath} alt="" />
                        
                        <p><strong>Ingredients</strong></p>
                        {/* {item.ingredients.map((list,index)=>
           
           <p>{index+1}.  {item.ingredients[index+1]} : {item.measures[index+1]}</p>
       
            )}  */}

                        <p style={{maxLines:"1"}}>{item.instructions}</p>
                       
                        {/* <h2>{item.recipe.label}</h2>
        <img src={item.recipe.image} alt="" /> */}

                    </div>)}</div>
        )
    } else {
        return (
            <div>
                <h1>No Recipes in Favorites List</h1>
            </div>)
    }
}

export default MyRecipes