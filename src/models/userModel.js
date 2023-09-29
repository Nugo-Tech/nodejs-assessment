const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    email: String,
    address: String,
    city: String,
    country: String
});

module.exports = mongoose.model("User", userSchema);