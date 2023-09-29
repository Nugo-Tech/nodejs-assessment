const express = require('express')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectToMongo = require('./mongodb'); // Adjust the path as needed

const app = express()
const port = 5000

// app.use(express.json())


// Connect to MongoDB
connectToMongo()
    .then(() => {
        // Start your Express application logic here
        // For example, define routes and start the server
        console.log('successfully connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });


app.listen(port, () => {
  console.log(`Server is up on port ` + port)
})

module.exports = app;
