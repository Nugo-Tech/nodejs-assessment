const userModel = require("../models/userModel");

exports.getAllUsers = async () => {
    return userModel.find();
}

exports.addUser = async (user) => {
    return userModel.create(user);
}

exports.getUserById = async (id) => {
    return userModel.findById(id);
}

exports.updateUser = async (id, user) => {
    return userModel.findByIdAndUpdate(id,user);
}

exports.deleteUser = async (id) => {
    return userModel.findByIdAndDelete(id);
}