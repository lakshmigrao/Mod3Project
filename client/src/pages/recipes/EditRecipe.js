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
            navigate(`/myrecipes`)
        }
    
        return ( 
            <div>
                <h1>Edit Recipe </h1>
                <div className='buttons' style={{ flexDirection: 'column' }}>
                    <form onSubmit={handleSubmit}>
    
                        <label htmlFor="rname">Recipe Name :</label><br />
                        <textarea ref={nameRef} id="rname" defaultValue={recipe.recipeName} /><br /><br />

                        <label htmlFor="ing">Ingredients :</label><br />
                        <textarea ref={ingRef} id="ing" cols="30" rows="5" defaultValue={recipe.ingredients} /><br /><br />

                        <label htmlFor="ing">Measures :</label><br />
                        <textarea ref={mesRef} id="ing" cols="30" rows="5" defaultValue={recipe.measures} /><br /><br />
                        
                        <label htmlFor="ins">Instructions :</label><br />
                        <textarea ref={insRef} id="ins" cols="30" rows="5" defaultValue={recipe.instructions} /><br /><br />
    
                        
    
    
                        <button>Save</button>
                    </form>
                    <Link to={`/myrecipes`}>
                        <button>Back</button>
                    </Link>
                </div>
            </div>
        );

}
export default EditRecipe