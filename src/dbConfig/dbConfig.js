const mongoose = require("mongoose")

const connectDB = async () =>{
    try {
        const connect = await mongoose.connect("mongodb+srv://admin:admin@jacobcluster.fbyqy2h.mongodb.net/Users?retryWrites=true&w=majority");
        console.log("Database Connected", connect.connection.host, connect.connection.name)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = connectDB