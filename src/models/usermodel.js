const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
},{
    timestamps:true
})
module.exports = mongoose.model("User",userSchema)