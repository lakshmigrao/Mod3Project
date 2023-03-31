const User = require('../models/UserModel')

async function show(req, res) {
    try {
        const foundUser = await User.findById(req.id).populate("favoriterecipes")
        
        res.json({ 
            username: foundUser.username, 
            email: foundUser.email,
            id: req.id,
            fname : foundUser.fname,
            lname : foundUser.lname,
            country : foundUser.country,
            favoriterecipes : foundUser.favoriterecipes
        })

    } catch (error) {
        res.json({ error: error.message })
    }
}

async function updateProfile(req,res){

    try {
        await User.findByIdAndUpdate(req.id, req.body)
        res.json({message : 'user updated successfully'})

    } catch (error) {
        res.json({ error: error.message })
    }


}

async function deleteProfile(req,res){

    try {
        await User.findByIdAndDelete(req.id)
        res.json({message : 'user deleted successfully'})

    } catch (error) {
        res.json({ error: error.message })
    }


}
module.exports = {
    show,
    updateProfile,
    deleteProfile
}