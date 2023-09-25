const express = require('express')
const connectDB = requrie('./dbConfig/dbConfig')
const dotenv = require('dotenv').config()


const app = express()

const port = 5000
app.use(express.json())

app.listen(port, () => {
  console.log(`Server is up on port ` + port)
})
