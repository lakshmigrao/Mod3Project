import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getARecipe,updateARecipe } from '../../services/recipeService'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            toast(`Changes are saved.`)
            
        }
        function goBack(){
            navigate(-1)
        }
    
        return ( 
            <div>
                {/* <ToastContainer
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
                />     */}
                <div className='details' style={{ flexDirection: 'column' }}>
                <abbr className="delete" title="Go Back">
                    <i onClick={goBack} style={{fontSize:"40px", cursor:"pointer"}} class="fa-solid fa-circle-arrow-left" alt="Go Back"></i>
                </abbr>
                <form onSubmit={handleSubmit}>
                <h1 style={{display:"flex",justifyContent:"center"}}>Edit Recipe </h1>
                    <div className='recipeDetails'><img src={recipe.imagepath} alt="" /></div>
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