const express = require('express')
const router = express.Router()
const usercontroller = require('../controllers/usercontroller')
const asyncHandler = require('express-async-handler')
const {check, validationResult} = require('express-validator')

router.post('/addUser',[
                            check('name', 'Name is inavlid').notEmpty(),
                            check('email', 'Email is inavlid').isEmail().notEmpty(),
                            check('address', 'Address is inavlid').notEmpty(),
                            check('city', 'city is inavlid').notEmpty(),
                            check('country', 'country is inavlid').notEmpty(),
                        ] ,
                            usercontroller.addUser)

router.get('/getUser/:id', usercontroller.getUser)
router.put('/:id', usercontroller.updateUser)
router.delete('/delete/:id',usercontroller.deleteUser)

module.exports = router