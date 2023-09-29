const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

//install mongoose
//create a cluster and get the uri to it
//create a .env folder in root of the project and paste the uri as MONGODB_URI =
const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGODB_URI)
        console.log('connecting to mongodb')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
}
module.exports = connectToMongo;