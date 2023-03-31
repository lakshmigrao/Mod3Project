const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema({

    recipeId :{
        type:Number,
        required:true
    },
    userId :{
        type:String,
        required : true
    },
    recipeName:{
        type:String,
        required:true
    },
    ingredients : {
        type: Array
    },
    measures : {
        type : Array
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