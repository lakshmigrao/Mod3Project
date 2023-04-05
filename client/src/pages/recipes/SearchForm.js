import {  useState,useRef, useEffect } from "react";
import RecipeDisplay from "./RecipeDisplay";
import Form from 'react-bootstrap/Form';
import { userInfo } from "../../services/userService";

function SearchForm({ recipes,setRecipes, myRecipes, setMyRecipes, user ,setUser}) {
  const searchRef = useRef()
  let [input, setInput] = useState();

//console.log(user.id)
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

    //const yourAPIKey = process.env.REACT_APP_KEY;//"AIzaSyBvJwQ-tZE4rgWnjZ9kYgnDo0ilUqz03Mc"//
    //let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchWord}&app_id=76c81bdd&app_key=dce02cdfbdb29db0e7dbcde813032b03`
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWord}`;//+inauthor:keyes

    try {
      let response = await fetch(url); // returns a Promise
      let data = await response.json();
      setRecipes(data);
     // console.log(data)
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
          {/* <input size="50" value={input} onChange={handleChange} placeholder="Search for recipes, ingredients" /> */}
          <Form.Control size="lg" ref={searchRef} type="text" placeholder="Search for recipes, ingredients" />
          <button style={{width:"40px"}}><i className="fa-solid fa-magnifying-glass"></i></button>
          {/* <button style={{marginTop:"30px"}} onClick={() => { setRecipes(""); setInput("") }}>Reset</button> */}
       </div> </Form>

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