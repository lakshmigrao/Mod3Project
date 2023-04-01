import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getRecipesFromUser, removeRecipeFromUserFav } from "../../services/recipeService"
import { Link } from "react-router-dom"
import ViewRecipe from "./ViewRecipe"

function MyRecipes({ myRecipes, setMyRecipes, user, setUser }) {//
    let updatedUser = {}

    let navigate = useNavigate()
    // let { name } = useParams()
    // console.log(name)
    useEffect(() => {
        
     loadData()
    }, [])
    async function loadData() {
        const data = await getRecipesFromUser()
         if(!data) navigate('/')
        setUser(data)
        console.log(user)
    }
    async function handleDelete(recipe) {
        //console.log(recipe._id)
        await removeRecipeFromUserFav(recipe._id)
        let updatedUser = {...user}
        updatedUser.favoriterecipes= updatedUser.favoriterecipes.filter(c => c._id !== recipe._id)
       console.log(updatedUser.favoriterecipes)
        setUser(updatedUser)

        let favoriteArray=JSON.parse(localStorage.getItem(user.username))
        let index = favoriteArray.indexOf(recipe.recipeId)
        favoriteArray.splice(index,1)
        localStorage.setItem(user.username,JSON.stringify(favoriteArray))
       //navigate(`/myrecipes/${name}`)
    }


    if (user.favoriterecipes?.length) {
        return (
            <div className="App">
                {user.favoriterecipes.map((item, index) =>
                    <div key={index} className="favorite recipeCard">
                         
                        <Link to={`/myrecipes/edit/${item._id}`}>
                                    <button>Edit</button>
                        </Link>
                        <Link to={`/myrecipes/${item._id}`}>
                        <button> View </button>
                        </Link>
                        
                        <button onClick={() => { handleDelete(item) }}> Remove </button>
                        
                        <h2>{item.recipeName}</h2>
                        {/* <h3>{item.recipeId}</h3> */}
                        <a className="video" href={item.videopath}><i class="fa-brands fa-youtube"></i></a>
                        <img src={item.imagepath} alt="" />
                        
                        <p><strong>Instructions</strong></p>
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
                <h1 style={{marginLeft:"400px", marginTop:"200px"}}>No Recipes in Favorites List</h1>
            </div>)
    }
}

export default MyRecipes