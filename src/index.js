const express = require('express')
const connectToMongo = require('./dbconfig/mongodb'); // Adjust the path as needed
const userRouter = require("./routes/userRoutes");
const bodyParser = require("body-parser");

const app = express()
const port = 5000

app.use(bodyParser.json());
app.use("/api/users",userRouter)


// calling the function to connect to mongodb database
connectToMongo()
    .then(() => {
        console.log('successfully connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });

//listen to the port
app.listen(port, () => {
  console.log(`Server is up on port ` + port)
})

module.exports = app;
