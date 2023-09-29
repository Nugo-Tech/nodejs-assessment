const express = require('express');
const Users = require('../models/userModel');
const router = express.Router();

// Define API routes here (create, read, update, delete)
// Read all users
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



module.exports = router;
