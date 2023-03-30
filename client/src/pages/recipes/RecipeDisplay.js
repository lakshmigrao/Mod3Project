import SearchForm from "./SearchForm"
import { Link } from "react-router-dom";
import { addRecipeToFav } from "../../services/recipeService";
import { useNavigate } from "react-router-dom";
function RecipeDisplay({ recipes, myRecipes, setMyRecipes ,user}) {
  let navigate = useNavigate()
  async function addToMyRecipes(item) {

    console.log("Recipe is added to ur list")
    console.log(user.id)
    let recipe = {
      recipeId : item.idMeal,
      userId : user.id,
      recipeName : item.strMeal,
      instructions : item.strInstructions,
      imagepath : item.strMealThumb,
      videopath : item.strYoutube
    }

    await addRecipeToFav(recipe)
   navigate('/')
    // if (myRecipes !== null) {
    //   let newArr = myRecipes;
    //   newArr.push(item)
    //   setMyRecipes(newArr)
    // }
    // else {
    //   setMyRecipes([item])
    // }
    // alert(item.volumeInfo.title + " Book added to MyRecipes.")
    // console.log("Book is added to ur list")
    // console.log("Book is added to localstorage")
    // localStorage.setItem('myRecipesls', JSON.stringify(myRecipes))
  }  

  if (recipes.meals) {
    return (
        
        recipes.meals.map((item,index) =>
        <div key={index} className="recipeCard card">
            <i className ="fa-regular fa-heart" onClick={()=>{<i style={{color:"red"}}className="fa-solid fa-heart"></i>}}></i>
          <Link to={`/recipes/${item.idMeal}`}>  <h2>{item.strMeal}</h2> 
          
            <img src={item.strMealThumb} alt="" /></Link>
            <button onClick={() => { addToMyRecipes(item) }}>Add to My Recipes</button>
            
       
        {/* <h2>{item.recipe.label}</h2>
        <img src={item.recipe.image} alt="" /> */}

    </div>)
    )

    //   recipe.meals.map((item, index) => {
    //     let temptitle, tempIsbn;
    //     if (item.volumeInfo.title) { temptitle = item.volumeInfo.title.replace(/[?:,.`~<>@#$%^&*/]/g,'') }//encodeURIComponent(item.volumeInfo.title) }//
    //     if (item.volumeInfo.industryIdentifiers !== undefined) {
    //       tempIsbn = item.volumeInfo.industryIdentifiers[0].identifier.replace(/[?:,.`~<>@#$%^&*/]/g,'')//encodeURIComponent(item.volumeInfo.industryIdentifiers[0].identifier)// 
    //       console.log(temptitle)
    //       return (
    //         <div key={index} className="recipesingle">
    //           <button onClick={() => { addToMyRecipes(item) }}>Add to My Recipes</button>
    //           {/* <Button className="like" value={index} onClick={(e) => handleIconClick(e.currentTarget.value)}>
    //             <Favorite/>
    //                          { isMyRecipes(photo.id) ? <Favorite /> : <FavoriteBorder />}
    //                 </Button> */}
    //           <Link to={`/bookdetails/${temptitle}/${tempIsbn}`}>
    //             {item.volumeInfo.imageLinks !== undefined ? <img className="bookImage" src={item.volumeInfo.imageLinks.thumbnail} /> : null}
    //             <h5 className="bookTitle">{item.volumeInfo.title} </h5>
    //           </Link>
    //           {/* {item.volumeInfo.authors !== undefined ? <h5>Author(s) : {item.volumeInfo.authors.join(', ')}</h5> : null} */}
    //         </div>
//           )
//         } else {
//           return null
//         }
//       }
//       )
//     )


//   }else{
// return <h1>No results found.</h1>

  }
}

export default RecipeDisplay;
