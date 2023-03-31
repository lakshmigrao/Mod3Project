const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type : String,
        required : true,
        unique: true
    },
    password:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required:true
    },
    fname : {
        type:String
    },
    lname : {
        type:String
    },
    country :{
        type:String
    },
    favoriterecipes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
     }]
})

const User = mongoose.model('User',userSchema)

module.exports = User