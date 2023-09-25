const express = require('express')
const router = express.Router()
const {addUser, getUser,updateUser,deleteUser} = require('../controllers/usercontroller')

router.route('/addUser').post(addUser)
router.route('/getUser/:id').get(getUser)
router.route('/update/:id').put(updateUser)
router.route('/delete/:id').delete(deleteUser)

module.exports = router