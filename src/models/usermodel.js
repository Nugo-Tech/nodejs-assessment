const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter the First Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter the Email"]
    },
    address:{
        type:String,
        required:[true,"Please Enter the Email"]
    },
    city:{
        type:String,
        required:[true,"Please Enter the Email"]
    },
    country:{
        type:String,
        required:[true,"Please Enter the Email"]
    },
},{
    timestamps:true
})
module.exports = mongoose.model("User",userSchema)