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