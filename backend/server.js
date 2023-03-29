require('dotenv').config()

const express = require('express')

const cors = require('cors')

const app = express()

const PORT = 8080

const connectDB = require('./config/db')

connectDB()

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const recipeRoutes = require('./routes/recipeRoutes')

const { authorize } = require('./middleware/authMiddleware')

app.use(express.json())
app.use(cors())

app.use('/users', authorize, userRoutes)
app.use('/auth', authRoutes)
app.use('/',recipeRoutes)

app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})

