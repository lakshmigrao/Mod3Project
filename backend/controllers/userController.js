const User = require('../models/UserModel')

async function show(req, res) {
    try {
        const foundUser = await User.findById(req.id)
        
        res.json({ 
            username: foundUser.username, 
            email: foundUser.email,
            id: req.id
        })

    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = {
    show
}