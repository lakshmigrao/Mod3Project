import SearchForm from "./SearchForm"
import { Link } from "react-router-dom";
import { addRecipeToFav } from "../../services/recipeService";
import { useNavigate } from "react-router-dom";
function RecipeDisplay({ recipes, myRecipes, setMyRecipes, user, setUser }) {

  let navigate = useNavigate()
  console.log(user)
  async function addToMyRecipes(item) {
    let ingredients = []
    let measures = []
    for (let i = 0; i < 20; i++) {
      if (item[`strIngredient${i + 1}`] == '') {
        break
      }
      ingredients[i] = item[`strIngredient${i + 1}`]
      measures[i] = item[`strMeasure${i + 1}`]
    }

    console.log(user.id)
    let newrecipe = {
      recipeId: item.idMeal,
      userId: user.id,
      recipeName: item.strMeal,
      ingredients: ingredients,
      measures: measures,
      instructions: item.strInstructions,
      imagepath: item.strMealThumb,
      videopath: item.strYoutube
    } 
    // if (myRecipes !== null) {
    //   let newArr = myRecipes;
    //   newArr.push(newrecipe)
    //   setMyRecipes(newArr)
    // }
    // else {
    //   setMyRecipes([newrecipe])
    // }
    let updatedUser = { ...user }
    updatedUser.favoriterecipes.push(newrecipe)
    setUser(updatedUser)
    await addRecipeToFav(newrecipe)
    navigate('/')
   alert("Recipe is added to ur list")
  }

  if (recipes.meals) {
    return (

      recipes.meals.map((item, index) =>
        <div key={index} className="recipeCard card">
          {user?.id?<i className="fa-regular fa-heart" onClick={() => { <i style={{ color: "red" }} className="fa-solid fa-heart"></i> }}></i>:''}
          <Link to={`/recipes/${item.idMeal}`}>  <h2>{item.strMeal}</h2>

            <img src={item.strMealThumb} alt="" /></Link>
          {user?.id ? <button onClick={() => { addToMyRecipes(item) }}>Add to My Recipes</button> : ''}


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
  // }else{
  //   return(
  //     <h1>Sorry, nothing matches your search.</h1>
  //   )
  // }
}

export default RecipeDisplay;
