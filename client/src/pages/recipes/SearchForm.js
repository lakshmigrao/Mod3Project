import {  useState,useRef, useEffect } from "react";
import RecipeDisplay from "./RecipeDisplay";
import Form from 'react-bootstrap/Form';
import { userInfo } from "../../services/userService";

function SearchForm({ recipes,setRecipes, myRecipes, setMyRecipes, user ,setUser}) {
  const searchRef = useRef()
  let [input, setInput] = useState();

  function handleChange(e) {
    setInput(e.target.value)
  }

  useEffect(()=>{
    console.log(user)
    return ()=>{setRecipes([])}
  },[])

  function handleSubmit(e) {
    e.preventDefault()
    let searchWord = searchRef.current.value
    if (searchWord !== undefined)
      getRecipes(searchWord)
  }

  async function getRecipes(searchWord) {

    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWord}`;

    try {
      let response = await fetch(url); // returns a Promise
      let data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.log("something went wrong");
    }
  }

  if (recipes) {
    return (
      <div>
        <Form style={{marginTop:"50px"}} onSubmit={handleSubmit}>
          <h1 className="search">Welcome to <spanhindi>recipe world</spanhindi> </h1>
          <div style={{display:"flex"}}>
            <Form.Control size="lg" ref={searchRef} type="text" placeholder="Search for recipes, ingredients" />
              <button style={{width:"40px"}}><i className="fa-solid fa-magnifying-glass"></i></button>
           </div>
        </Form>

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
          <input className="form-control" value={input} onChange={handleChange} placeholder="Search for recipes, ingredients" />
          <button><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
      </div>
    );
  }
}

export default SearchForm;