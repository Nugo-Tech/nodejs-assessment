const asyncHandler = require('express-async-handler')
const User = require('../models/usermodel')
const {body, validationRul, validationResult} = require('express-validator')


const addUser = asyncHandler(async(req,res)=> {
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
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {name, email, address, city, country} = req.body;

    const user = await User.create({
        name,
        email,
        address,
        city,
        country
    })
    res.json(201).json(user)
})

const getUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await User.findById(id);
      if (!user) {
        res.status(404);
        throw new Error("Not found");
      }
      res.status(200).json(user);
    }
  });

  module.exports ={
    addUser,
    getUser
  }