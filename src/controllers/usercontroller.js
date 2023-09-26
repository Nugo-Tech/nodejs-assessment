const asyncHandler = require('express-async-handler')
const User = require('../models/usermodel')
const {check, validationResult} = require('express-validator')


const addUser =(async (req, res) => {
    try {
      const errors = validationResult(req);
      console.log('Validation Errors:', errors.array()); // Add this line
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
      res.status(200).json({user, message:"User Found Successfully"});
    }
  });

  const updateUser = asyncHandler(async (req, res, next) => {
    const validation = [
      body('name').notEmpty().withMessage("Name is required"),
      body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email address'),
      body('address').notEmpty().withMessage("Address is required"),
      body('city').notEmpty().withMessage('City is required'),
      body('country').notEmpty().withMessage('Country is required')
    ];
  
    // Apply validation middleware and get validation results
    await Promise.all(validation.map(validationFunction => validationFunction(req, res)));
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
      next(error); // Pass the error to the error handling middleware
    }
  });
  

const deleteUser = asyncHandler(async(req,res)=>{
    const id = req.params.id
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const user = await User.findById(id)
        if(!user){
            res.status(404).json({message:"No user found"})
        }
        await User.deleteOne()
        res.status(200).json({user , message:"User deleted successfully"})
    }

})
  module.exports ={
    addUser,
    getUser,
    updateUser,
    deleteUser
  }