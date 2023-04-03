import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getRecipesFromUser, removeRecipeFromUserFav } from "../../services/recipeService"
import { Link } from "react-router-dom"
import ViewRecipe from "./ViewRecipe"

function MyRecipes({ myRecipes, setMyRecipes, user, setUser }) {//
    let updatedUser = {}

    let navigate = useNavigate()

function goBack(){
    navigate('/')//-1 to go back to previous page
}  
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
       alert(`${recipe.recipeName} is removed from My Recipes.`)
    }


    if (user.favoriterecipes?.length) {
        return (<div style={{display:"flex"}}>
            <abbr className="back" title="Go Back">
                <i onClick={goBack} style={{fontSize:"40px", cursor:"pointer", marginLeft:"50px",marginTop:"50px"}} class="fa-solid fa-circle-arrow-left" alt="Go Back"></i>
            </abbr> 
            <div className="App">        
                {user.favoriterecipes.map((item, index) =>
                    <div key={index} className="favorite recipeCard"> 
                        <abbr title="Remove from My Recipes"><i onClick={() => { handleDelete(item) }} style={{fontSize:"25px", marginLeft:"225px", cursor:"pointer"}} class="fa-solid fa-xmark xmark"></i></abbr>       
                        <h2>{item.recipeName}</h2>
                        {/* <h3>{item.recipeId}</h3> */}
                        <a className="video" href={item.videopath}><i class="fa-brands fa-youtube"></i></a>
                        {/* {item.ingredients.map((list,index)=>
           
           <p>{index+1}.  {item.ingredients[index+1]} : {item.measures[index+1]}</p>
       
            )}  */} 
                        <br />
                        <Link to={`/myrecipes/${item._id}`}>
                        {/* <button> View </button> */}
                        <img src={item.imagepath} alt="" />
                        </Link>                        
                        {/* <button onClick={() => { handleDelete(item) }}> Remove </button> */}
                        <br />
                        {item.instructions?<p><strong>Instructions</strong></p>:''}
                        <p>{item.instructions.substring(0,130)}.....<Link to={`/myrecipes/${item._id}`}>Click to read</Link></p>
                       
                        {/* <h2>{item.recipe.label}</h2>
        <img src={item.recipe.image} alt="" /> */}

                    </div>)}
                    <div style={{display:"flex", justifyContent:"flex-end", marginTop:"50px"}}><abbr title="Click to create a new reipe"><Link to="/myrecipes/newrecipe"><i style={{fontSize:"50px", marginLeft : "0px"}} className="fa-solid fa-plus plus"></i></Link></abbr></div>
                    </div></div>
        )
    } else {
        return (
            <>
            {localStorage.removeItem(user.username)}
            <abbr className="back" title="Go Back">
                <i onClick={goBack} style={{fontSize:"40px", cursor:"pointer", marginLeft:"50px",marginTop:"50px"}} class="fa-solid fa-circle-arrow-left" alt="Go Back"></i>
            </abbr> 
            <div style={{display:"flex",color:"white", justifyContent:"center"}}>

                
                <h2 style={{marginTop:"300px"}}>MyRecipes is empty, would you like to create one?  </h2>
                <Link to="/myrecipes/newrecipe"><i style={{fontSize:"50px",marginTop:"300px", marginLeft : "50px"}} className="fa-solid fa-plus plus"></i></Link>
                
                

            </div></>)
    }
}

export default MyRecipes