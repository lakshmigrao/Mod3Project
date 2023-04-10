import './App.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect, useState, Navigate} from 'react';
import { Route } from 'react-router-dom';
import SearchForm from './pages/recipes/SearchForm';
import RecipeDetails from './pages/recipes/RecipeDetails';
import Nav from './components/NavBar'
import Register from './pages/users/Register'
import Login from './pages/users/Login'
import MyRecipes from './pages/recipes/MyRecipes'
import Profile from './pages/users/Profile'
import NewRecipe from './pages/recipes/NewRecipe';
import EditRecipe from './pages/recipes/EditRecipe';
import ViewRecipe from './pages/recipes/ViewRecipe';
import EditProfile from './pages/users/EditProfile';
import { userInfo } from './services/userService';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer'
import ReactPaginate from "react-paginate";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

function App() {

  library.add(fas)
  let [recipes, setRecipes] = useState({})
  const [user,setUser] = useState({})
  let [myRecipes,setMyRecipes]=useState([])
  const [isLoading, setIsLoading] = useState(true)
  let navigate = useNavigate()

  useEffect(()=> {
    
    let token = localStorage.getItem("token")

    if(token){
      getLoggedInUser()
    }else{
      setIsLoading(false)
    }

    async function getLoggedInUser(){
      const user = await userInfo()
      setUser(user)
      
      setIsLoading(false)
    }
  }, [])

  let loggedIn = user?.username
    return (
    <div >
      {/* className="App" */}
      <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
          />    
      <Nav user={loggedIn} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<SearchForm recipes={recipes} setRecipes={setRecipes} myRecipes={myRecipes} setMyRecipes={setMyRecipes} user={user} setUser={setUser} />} />
        <Route path="/recipes/:idMeal" element={<RecipeDetails recipes={recipes} setRecipes={setRecipes} user={user} />} />
        {loggedIn ? 
        <>
        <Route path="/profile" element={<Profile user={user} setUser={setUser}/>} />
        <Route path="/profile/edit" element={<EditProfile user={user} setUser={setUser}/>} />  
        <Route path="/myrecipes" element={<MyRecipes myRecipes={myRecipes} setMyRecipes={setMyRecipes} user={user} setUser={setUser}/>} />
        <Route path="/myrecipes/newrecipe" element={<NewRecipe user={user} setUser={setUser}/>} /> 
        <Route path="/myrecipes/edit/:rid" element={<EditRecipe user={user} setUser={setUser}/>} /> 
        <Route path="/myrecipes/:rid" element={<ViewRecipe user={user} setUser={setUser}/>} /> 
        
         {!isLoading && <Route path='*' element={<navigate to='/login' />} />}
        </> 
        :
        <>
        <Route path='/register' element={<Register setUser={setUser} />} /> 
        <Route path='/login' element={<Login setUser={setUser} />} />
        {!isLoading && <Route path='*' element={<navigate to='/login' />} />}
        </> 
      }
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
