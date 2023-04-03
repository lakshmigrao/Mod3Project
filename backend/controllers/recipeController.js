const Recipe = require('../models/RecipeModel')
const User = require('../models/UserModel')

module.exports.add= async(req,res)=>{

    try{
        const recipe = await Recipe.create(req.body)
        
        await User.findByIdAndUpdate(recipe.userId , {
            // and push the new comment document's id
            $push: {
                // to the post's comments field/property
                favoriterecipes : recipe._id
            }
        })
        res.status(200).json(recipe)
    }catch(err){
        res.status(400).json({error : err.message})
    }

}

module.exports.show = async (req,res) =>{
    try{
        const user = await User.findById(req.id).populate('favoriterecipes')
        res.status(200).json(user)
    }catch(err){
        res.status(404).json({ error: err.message })
    }
}

module.exports.delete = async (req,res) => {

    try{
        await Recipe.findOneAndDelete({_id : req.params.rid})
        await User.findIdBy(req.id,{
            $pull:{
                favoriterecipes : req.params.rid
            }
        })
    }catch(err){
        res.status(404).json({ error: err.message })
    }
}

module.exports.updateRecipe = async (req,res) =>{
    try{
        await Recipe.findByIdAndUpdate(req.params.rid, req.body)
        res.json({message : 'updated successfully'})
    }catch(err){
        res.status(404).json({ error: err.message })
    }
}
module.exports.showRecipe = async (req,res) =>{
    try{
        const recipe = await Recipe.findById(req.params.rid)
        res.status(200).json(recipe)
    }catch(err){
        res.status(404).json({ error: err.message })
    }
}

module.exports.deleteUsingIdmeal = async (req,res) => {

    try{
        await Recipe.findOneAndDelete({recipeId : req.params.ridMeal})
        await User.findIdBy(req.id,{
            $pull:{
                favoriterecipes : req.params.ridMeal
            }
        })
    }catch(err){
        res.status(404).json({ error: err.message })
    }
}
module.exports.createNewRecipe= async(req,res)=>{

    try{
        const recipe = await Recipe.create(req.body)
        console.log(recipe)
        await User.findByIdAndUpdate(recipe.userId , {
            // and push the new comment document's id
            $push: {
                // to the post's comments field/property
                favoriterecipes : recipe._id
            }
        })
        res.status(200).json(recipe)
    }catch(err){
        res.status(400).json({error : err.message})
    }

}