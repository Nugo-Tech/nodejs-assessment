// Import necessary packages and libraries
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const userRoutes = require('./routes/userRoute')

// Create an Express application
const app = express();

// Define the port where the server will run
const port = 5000;

// Get the MongoDB URI from environment variables
const dbURI = process.env.MONGODB_URI;

// Create an async function for connecting to MongoDB
async function connectToMongoDB() {
  try {
    // Attempt to connect to MongoDB using Mongoose
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Exit the application if the connection fails
    process.exit(1);
  }
}

// Call the async function to connect to MongoDB
connectToMongoDB();

// Parse JSON request bodies
app.use(express.json());


app.use('/users', userRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is up on port ` + port);
});
