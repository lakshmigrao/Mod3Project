const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema({

    recipeName :{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    ingredients:{
        type:String
    },
    imagepath : {
        type:String
    }
})

const Recipe = mongoose.model('Recipe',)

