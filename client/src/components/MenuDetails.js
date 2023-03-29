import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function MenuDetails({favoriteRecipes,setFavoriteRecipes}){

    let { idMeal } = useParams()
    console.log("Useparams ", idMeal )
    let navigate = useNavigate()
    
    let [menuDetails, setMenuDetails] = useState()
    
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    
    const getMenuDetails = async() => { //async function getCoin() {}, function hoisting
        try{
            const response = await fetch(url)
            const data = await response.json()
            setMenuDetails(data)
            console.log(data)
        }catch(error){
            console.error(error)
        }
        
    }
    useEffect(() => {
        getMenuDetails()
    }, [])
    

    function goBack(){
        navigate(-1)//-1 to go back to previous page
    }
    const loaded = () => {
        // let item;
        //let index;
        // if(menuDetails.meals){
        //     console.log("menuDetails.meals")
        //     console.log(menuDetails.meals)
        //     console.log(idMeal)
            
            // for(let i=0;i<menuDetails.items.length;i++){            
            //     if(menuDetails.items[i].volumeInfo.title
            //         && menuDetails.items[i].volumeInfo.industryIdentifiers){                               
            //     if(isbn===menuDetails.items[i].volumeInfo.industryIdentifiers[0].identifier.replace(/[?:,.`~<>@#$%^&*/]/g, '')//encodeURIComponent(menuDetails.items[i].volumeInfo.industryIdentifiers[0].identifier)//
            //     || title===menuDetails.items[i].volumeInfo.title.replace(/[?:,.`~<>@#$%^&*/]/g, '')//encodeURIComponent(menuDetails.items[i].volumeInfo.title)//
            //     ){
            //         index=i;
            //         break;
            //     }}

            // }
        //     //item = menuDetails.items.filter(menu =>id === menu.id)
        //     item=menuDetails.items[index]
        //     console.log("item")
        // console.log(item)
     
        return (
            <div >
                    <img className="menuDetailsImg" src={menuDetails.meals[0].strMealThumb} />
                    <h3>Meal : {menuDetails.meals[0].strMeal}</h3>
                    <p>Instructions : {menuDetails.meals[0].strInstructions}</p>
                    <button onClick={goBack}>Back</button>
                
            </div>)
      {/*       )}else{
            return(<>
                <h1>The Menu details not found in database.</h1>
                <button onClick={goBack}>Back</button>
            </>)
        }
        }else{
            return(<>
                <h1>The Menu details not found in database.</h1>
                <button onClick={goBack}>Back</button>
            </>) 
        } */}
        
    }
        

    const loading = () => {
        return(
            <h1>Menu Details Page Loading...</h1>
        )
    }
   
    return menuDetails ? loaded() : loading()
//return
}

export default MenuDetails
