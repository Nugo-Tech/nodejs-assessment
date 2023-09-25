const express = require('express')
const connectDB = require('./dbConfig/dbConfig')
const dotenv = require('dotenv').config()

connectDB()

const app = express()

const port = 5000
app.use(express.json())

app.listen(port, () => {
  console.log(`Server is up on port ` + port)
})
