const express = require('express');
const Users = require('../models/userModel');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Define a centralized error handling middleware.
const handleErrors = (err, req, res, next) => {
  // Log the error to the console for debugging purposes.
  console.error(err);

  // Check if the error is a Mongoose validation error
  if (err.name === 'ValidationError') {
    // If it is a validation error, send a 400 Bad Request response with validation errors.
    return res.status(400).json({ errors: err.errors });
  }

  // For all other types of errors, send a generic 500 Internal Server Error response.
  return res.status(500).json({ error: 'Server error' });
};

// Validation middleware for creating a new user and updating data
const validateCreateUser = [
  body('Id').notEmpty().isInt({ min: 1 }),
  body('name').notEmpty().trim().isString(),
  body('email').isEmail().normalizeEmail(),
  body('address').notEmpty().trim().isString(),
  body('city').notEmpty().trim().isString(),
  body('country').notEmpty().trim().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Define API routes here (create, read, update, delete)
// Read all users
/*
router.get('/', async (req, res) => {
  try {
    const allUsers = await Users.find();
    return res.status(200).json({
      allUsers,
    });
  } catch (err) {
    return res.status(400).json({
      Failed: 'Server error',
      error: err,
    });
  }
});
*/

// Read user by Id
router.get('/:Id', async (req, res) => {
  try {
    const User = await Users.findOne({ Id: req.params.Id });

    if (!User) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      User,
    });
  } catch (err) {
    return res.status(400).json({
      Failed: 'Server error',
      error: err,
    });
  }
});

// Insert user data
router.post('/insert', validateCreateUser, async (req, res) => {
  try {
    const newUser = new Users(req.body);
    const savedUser = await newUser.save();

    return res.status(200).json({
      Success: 'New user saved successfully',
      savedUser,
    });
  } catch (error) {
    return res.status(400).json({
      Failed: 'Server error',
      error: err,
    });
  }
});

// Update user data
router.put('/update/:Id', validateCreateUser, async (req, res) => {
  try {
    // Assuming 'Users' is the Mongoose model for your users collection
    const updatedUser = await Users.findOneAndUpdate(
      { Id: req.params.Id }, // Specify the query conditions here
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      Success: 'User data updated successfully',
      updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      Failed: 'Server error',
      error: err,
    });
  }
});

// Delete user data
router.delete('/delete/:Id', async (req, res) => {
  try {
    // Assuming 'Users' is the Mongoose model for your users collection
    const deletedUser = await Users.findOneAndDelete({ Id: req.params.Id });

    if (!deletedUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: 'User information deleted successfully',
      deletedUser,
    });
  } catch (err) {
    return res.status(500).json({
      failed: 'Server error',
      error: err,
    });
  }
});

// Centralized Error Handling Middleware
router.use(handleErrors);

module.exports = router;
