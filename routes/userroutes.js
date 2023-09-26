const express = require('express')
const router = express.Router()
const usercontroller = require('../controllers/usercontroller')
const { userValidation } = require('../middleware/datavalidation')

router.post('/',userValidation, usercontroller.addUser)
router.get('/:id', usercontroller.getUser)
router.put('/:id',userValidation, usercontroller.updateUser)
router.delete('/:id',usercontroller.deleteUser)

module.exports = router