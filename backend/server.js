require('dotenv').config()

const express = require('express')

const cors = require('express')

const app = express()

const PORT = 8080

const connectDB = require('./config/db')

connectDB()


app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})

