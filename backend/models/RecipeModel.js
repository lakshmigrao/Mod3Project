const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema({

    recipeId :{
        type:Number,
        required:true
    },
    userId :{
        type:String,
    },
    recipeName:{
        type:String,
        required:true
    },
    instructions:{
        type:String
    },
    imagepath : {
        type:String
    },
    videopath :{
        type:String
    }

})

const Recipe = mongoose.model('Recipe',recipeSchema)

module.exports = Recipe