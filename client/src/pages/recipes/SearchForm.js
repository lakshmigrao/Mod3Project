import {  useState } from "react";
import RecipeDisplay from "./RecipeDisplay";

function SearchForm({ recipes,setRecipes, myRecipes, setMyRecipes, user ,setUser}) {

  let [input, setInput] = useState();
//console.log(user.id)
  function handleChange(e) {
    setInput(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (input !== undefined)
      getRecipes(input)
  }

  async function getRecipes(searchWord) {

    //const yourAPIKey = process.env.REACT_APP_KEY;//"AIzaSyBvJwQ-tZE4rgWnjZ9kYgnDo0ilUqz03Mc"//
    //let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchWord}&app_id=76c81bdd&app_key=dce02cdfbdb29db0e7dbcde813032b03`
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWord}`;//+inauthor:keyes

    try {
      let response = await fetch(url); // returns a Promise
      let data = await response.json();
      setRecipes(data);
      console.log(data)
    } catch (error) {
      console.log("something went wrong");
    }

  }

  if (recipes) {
    return (
      <div>
        <form style={{marginTop:"50px"}}onSubmit={handleSubmit}>
          <h1 className="search">Search for a recipe</h1>
          <input value={input} onChange={handleChange} />
          <button>Search</button>
          <button onClick={() => { setRecipes(""); setInput("") }}>Refresh</button>
        </form>

        <div className="App">
          < RecipeDisplay recipes={recipes} myRecipes={myRecipes} setMyRecipes={setMyRecipes} user={user} setUser={setUser}/>
        </div>
      </div>
    );
  } else {
    return (
      <div>

        <form onSubmit={handleSubmit}>
          <h1 className="search">Search for a recipe</h1>
          <input value={input} onChange={handleChange} placeholder="Search for recipes, ingredients" style={{ width: "250px" }} />
          <button>Search</button>
        </form>
      </div>
    );
  }
}

export default SearchForm;