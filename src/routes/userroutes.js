const express = require('express')
const router = express.Router()
const usercontroller = require('../controllers/usercontroller')
const asyncHandler = require('express-async-handler')
const {check, validationResult} = require('express-validator')
const { addUserValidation } = require('../middleware/datavalidation')

router.post('/addUser',addUserValidation, usercontroller.addUser)

router.get('/getUser/:id', usercontroller.getUser)
router.put('/:id', usercontroller.updateUser)
router.delete('/delete/:id',usercontroller.deleteUser)

module.exports = router