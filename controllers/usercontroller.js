const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const {check, validationResult} = require('express-validator')


const addUser =asyncHandler(async (req, res) => {
    try {
      const errors = validationResult(req);
      console.log('Validation Errors:', errors.array());
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });     
       }else{
      const { name, email, address, city, country } = req.body;
     
      const user = await User.create({
        name,
        email,
        address,
        city,
        country,
      });
      res.status(201).json({ user, message: 'User created successfully' });
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

const getUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await User.findById(id);
      if (!user) {
        res.status(404).json({message:"Not found"});
      }
      res.status(200).json({ message:"User Found Successfully",user});
    }
  });

  const updateUser = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log('Validation Errors:', errors.array()); // Add this line
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return res.status(400).json({ errors: errorMessages });     
     }
    const id = req.params.id;
  
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ message: "Not Found" });
    }
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "Not Found" });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      return res.status(200).json({ updatedUser, message: "User updated successfully" });
    } catch (error) {
      console.error(error);
      next(error); 
    }
  });
  

  const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "No user found" });
            }
            await User.deleteOne({ _id: id });
            return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
});

  module.exports ={
    addUser,
    getUser,
    updateUser,
    deleteUser
  }