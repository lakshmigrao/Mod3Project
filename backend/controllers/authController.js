const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/UserModel')

async function register(req, res) {

    try {
        // 1. Check if user already exists
        const foundUser = await User.findOne({ username: req.body.username })

        if (foundUser) {
            return res.status(400).json({ error: 'User already exists' })
        }

        // 2. If they don't, encrypt their password

        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(req.body.password, salt) 

        // 3. Add new user to database with password encrypted

        const newUser = await User.create({ ...req.body, password: encryptedPassword })

        // 4. Generate a JWT token and return it to user

        const payload = { id: newUser._id, user: newUser.username }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 600 })

        res.status(200).json({ token }) 
    } catch(err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
}

async function login(req, res) {

    try {
        // 1. Check if user exists

        const foundUser = await User.findOne({ username: req.body.username })

        if (!foundUser) {
            return res.status(404).json({ error: 'No such user exists' })
        }

        // 2. Check if password provided by user matches the one in database

        const validPass = await bcrypt.compare(req.body.password, foundUser.password)

        if (!validPass) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }

        // 3. Generate a JWT token and return it to user

        const payload = { id: foundUser._id, user: foundUser.username }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 600 })

        res.status(200).json({ token }) 

    } catch(err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
}

module.exports = {
    register,
    login
}