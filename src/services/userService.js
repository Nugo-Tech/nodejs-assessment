const userModel = require("../models/userModel");

//creating a service to get all user data from db
exports.getAllUsers = async () => {
    return userModel.find();
}

//creating a service to add users to the db
exports.addUser = async (user) => {
    return userModel.create(user);
}

//creating a service to get single user by Id
exports.getUserById = async (id) => {
    return userModel.findById(id);
}

//creating a service to update a user
exports.updateUser = async (id, user) => {
    return userModel.findByIdAndUpdate(id,user);
}

//creating a service to delete a user
exports.deleteUser = async (id) => {
    return userModel.findByIdAndDelete(id);
}