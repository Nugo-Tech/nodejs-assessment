const express = require('express');
const Users = require('../models/userModel');
const router = express.Router();

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
router.post('/insert', async (req, res) => {
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
router.put('/update/:Id', async (req, res) => {
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
      deletedUser
    });
  } catch (err) {
    return res.status(500).json({
      failed: 'Server error',
      error: err
    });
  }
});

module.exports = router;
