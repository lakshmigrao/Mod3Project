import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getARecipe,updateARecipe } from '../../services/recipeService'
function EditRecipe({user,setUser}){

        const [recipe,setRecipe] = useState({})
        const navigate = useNavigate()
        const params = useParams()
    
        const nameRef = useRef()
        const insRef = useRef()
        const ingRef = useRef()
        const mesRef = useRef()
    
        useEffect(() => {
            getARecipe(params.rid).then(data => setRecipe(data))
        }, [params.rid])
    
        async function handleSubmit(e) {
            e.preventDefault()
    
            let updatedRecipe = {
                recipeName: nameRef.current.value,
                ingredients: ingRef.current.value,
                measures: mesRef.current.value,
                instructions: insRef.current.value
            }
           
            await updateARecipe(params.rid, updatedRecipe)
            alert("Changes are saved.")
            navigate(`/myrecipes`)
        }
        function goBack(){
            navigate(-1)
        }
    
        return ( 
            <div>
                <div className='buttons details' style={{ flexDirection: 'column' }}>
                <abbr className="delete" title="Go Back">
                    <i onClick={goBack} style={{fontSize:"40px", cursor:"pointer"}} class="fa-solid fa-circle-arrow-left" alt="Go Back"></i>
                </abbr>
    
                <form onSubmit={handleSubmit}>
                <h2>Edit Recipe </h2>
                    <img style={{width:"300px",height:"280px",border: "3px solid black", boxShadow:" 12px 12px 2px 2px black",borderRadius:"5%"}} src={recipe.imagepath} alt="" />
                    <br /><br />
                    <label htmlFor="rname">Recipe Name :</label><br />
                    <textarea ref={nameRef} id="rname" defaultValue={recipe.recipeName} /><br /><br />
            
                    <label htmlFor="ing">Ingredients :</label><br />
                    <textarea ref={ingRef} id="ing" cols="60" rows="3" defaultValue={recipe.ingredients} /><br /><br />

                    <label htmlFor="ing">Measures :</label><br />
                    <textarea ref={mesRef} id="ing" cols="60" rows="3" defaultValue={recipe.measures} /><br /><br />
                    
                    <label htmlFor="ins">Instructions :</label><br />
                    <textarea ref={insRef} id="ins" cols="60" rows="8" defaultValue={recipe.instructions} /><br /><br />

                    <button style={{marginLeft:"150px"}} >Save <i style={{fontSize:"20px"}} class="fa-regular fa-floppy-disk"></i></button>
                    <Link to={`/myrecipes`}>
                        <button style={{marginLeft:"100px"}}><i class="fa-solid fa-circle-arrow-left" alt="Go Back"></i>Back</button>
                    </Link>
                </form>
                    
                    
                </div>
            </div>
        );

}
export default EditRecipe